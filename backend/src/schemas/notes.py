from pydantic import BaseModel
from datetime import datetime

class NoteBase(BaseModel):
    title: str
    body: str


class NoteCreate(NoteBase):
    pass

class NoteUpdate(NoteBase):
    pass

class Note(NoteBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True