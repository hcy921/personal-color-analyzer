from pydantic import BaseModel
from typing import Optional

class AnalyzeRequest(BaseModel):
    image_base64: str
    media_type: str = "image/jpeg"

class ColorItem(BaseModel):
    hex: str
    name: str

class ColorResult(BaseModel):
    season: str
    undertone: str
    description: str
    colors: list[ColorItem]
    worstColors: list[ColorItem]
    makeup: dict
    lip: list[ColorItem]
    blush: list[ColorItem]
    hair: list[ColorItem]

class AnalyzeResponse(BaseModel):
    result: ColorResult