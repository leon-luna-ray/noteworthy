from pydantic import BaseModel
from datetime import datetime

# class UserLogin(UserBase):
#     pass

# class User(UserBase):
#     id: int
#     created_at: datetime
#     updated_at: datetime

#     class Config:
#         from_attributes = True

class CreateUserRequest(BaseModel):
    email: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str