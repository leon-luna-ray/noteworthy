from fastapi import APIRouter, HTTPException
from .. import models, schemas
from ..database import db_dependency

router = APIRouter()

@router.post("/register", response_model=schemas.User)
def register_user(user: schemas.UserCreate, db: db_dependency):
    db_user = models.Users(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@router.post("/login")
def login_user(user: schemas.UserLogin, db: db_dependency):
    db_user = db.query(models.Users).filter(models.Users.email == user.email).first()
    if not db_user or not db_user.password == user.password:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    return {"message": "Login successful"}