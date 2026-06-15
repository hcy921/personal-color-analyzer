import json
import os
import anthropic
from dotenv import load_dotenv
from models import AnalyzeResponse, ColorResult

load_dotenv()
client = anthropic.Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))

SYSTEM_PROMPT = """你是一位專業的韓系個人色彩分析師。
請分析使用者上傳的照片，判斷其個人色彩季節類型。
請以 JSON 格式回覆，包含：
- season: 季節類型（春／夏／秋／冬）
- undertone: 膚色調性（暖調／冷調）
- description: 簡短分析說明（繁體中文，50字以內）
- colors: 推薦色清單（6個 hex color codes）
- makeup: 妝容建議，包含 lip、eye、blush 三個欄位
只回傳 JSON，不要加任何說明文字。"""

def analyze_image(image_base64: str, media_type: str) -> AnalyzeResponse:
    message = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=1024,
        system=SYSTEM_PROMPT,
        messages=[{
            "role": "user",
            "content": [
                {
                    "type": "image",
                    "source": {
                        "type": "base64",
                        "media_type": media_type,
                        "data": image_base64,
                    }
                },
                {
                    "type": "text",
                    "text": "請分析這張照片的個人色彩季節類型。"
                }
            ]
        }]
    )

    raw = message.content[0].text
    # 移除可能的 markdown 標記
    raw = raw.strip()
    if raw.startswith("```"):
        raw = raw.split("```")[1]
        if raw.startswith("json"):
            raw = raw[4:]
    raw = raw.strip()
    data = json.loads(raw)

    return AnalyzeResponse(
        result=ColorResult(
            season=data["season"],
            undertone=data["undertone"],
            description=data["description"],
            colors=data["colors"],
            makeup=data["makeup"],
        )
    )