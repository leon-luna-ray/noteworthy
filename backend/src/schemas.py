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

class UserBase(BaseModel):
    email: str
    password: str
    
class UserCreate(UserBase):
    pass

class UserLogin(UserBase):
    pass

class User(UserBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True