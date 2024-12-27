from pydantic import BaseModel
from datetime import datetime

class NoteBase(BaseModel):
    title: str
    body: str
    user_id: int

class NoteCreate(NoteBase):
    pass

class Note(NoteBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True