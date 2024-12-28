from pydantic import BaseModel
from datetime import datetime

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

class CreateUserRequest(BaseModel):
    email: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str