from pydantic import BaseModel
from typing import Optional

class AnalyzeRequest(BaseModel):
    image_base64: str
    media_type: str = "image/jpeg"

class ColorResult(BaseModel):
    season: str
    undertone: str
    description: str
    colors: list[str]
    makeup: dict

class AnalyzeResponse(BaseModel):
    result: ColorResult