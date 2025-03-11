from pydantic import BaseModel
from typing import List, Optional

class IngredientDetail(BaseModel):
    ingredient: str
    properties: str

class Product(BaseModel):
    id: int
    name: str
    description: str
    effects: List[str]
    ingredient_details: Optional[List[IngredientDetail]] = None
