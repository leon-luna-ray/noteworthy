from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import APIRouter, HTTPException
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from decouple import config

from .. import models
from ..schemas import CreateUserRequest, Token, User, UserLogin
from ..database import db_dependency

router = APIRouter()

SECRET_KEY = config('SECRET_KEY')
ALGORITHM = config('ALGORITHM')

bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_bearer = OAuth2PasswordBearer(tokenUrl="authToken")

@router.post("/register", response_model=User)
def create_user(db: db_dependency, create_user_request: CreateUserRequest):
    create_user_model = models.Users(email=create_user_request.email, password=create_user_request.password)
    db.add(create_user_model)
    db.commit()
    db.refresh(create_user_model)
    return create_user_model

@router.post("/login")
def login_user(user: UserLogin, db: db_dependency):
    db_user = db.query(models.Users).filter(models.Users.email == user.email).first()
    if not db_user or not db_user.password == user.password:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    return {"message": "Login successful"}
