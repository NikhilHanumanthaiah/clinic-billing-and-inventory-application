
from pydantic import BaseModel
from typing import List, Optional

class BillItemCreate(BaseModel):
    medicine_id: int
    quantity: int
    price_per_unit: Optional[float] = None

class BillCreate(BaseModel):
    patient_name: str
    patient_age: int
    items: List[BillItemCreate]
