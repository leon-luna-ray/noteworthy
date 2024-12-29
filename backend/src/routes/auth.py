from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from decouple import config

from jose import JWTError, jwt
from typing import Annotated
from datetime import datetime, timedelta, timezone
from passlib.context import CryptContext

from ..models import Users
from ..schemas import CreateUserRequest, Token
from ..database import db_dependency

SECRET_KEY = config("SECRET_KEY")
ALGORITHM = config("ALGORITHM")

router = APIRouter()

bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_bearer = OAuth2PasswordBearer(tokenUrl="api/v1/auth/token")

# /api/v1/auth/register
@router.post("/register", status_code=status.HTTP_201_CREATED)
async def create_user(db: db_dependency, create_user_request: CreateUserRequest):
    existing_user = (
        db.query(Users).filter(Users.email == create_user_request.email).first()
    )
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered"
        )

    create_user_model = Users(
        email=create_user_request.email,
        password=bcrypt_context.hash(create_user_request.password),
    )
    db.add(create_user_model)
    db.commit()

# /api/v1/auth/token
@router.post("/token", response_model=Token)
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()], db: db_dependency
):
    user = authenticate_user(form_data.username, form_data.password, db)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )
    token = create_access_token(user.email, user.id, timedelta(minutes=15))

    return {"access_token": token, "token_type": "bearer"}


def authenticate_user(username: str, password: str, db):
    user = db.query(Users).filter(Users.email == username).first()
    if not user:
        return False
    if not bcrypt_context.verify(password, user.password):
        return False

    return user


def create_access_token(email: str, user_id: int, expires_delta: timedelta):
    to_encode = {"sub": email, "user_id": user_id}
    expires = datetime.now(timezone.utc) + expires_delta
    to_encode.update({"exp": expires})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

    return encoded_jwt


async def get_current_user(token: Annotated[str, Depends(oauth2_bearer)]):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        user_id: int = payload.get("user_id")
        if email is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials",
            )
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
        )

    return {"email": email, "user_id": user_id}

# /api/v1/auth/whoami
@router.get("/whoami", status_code=status.HTTP_200_OK)
async def whoami(current_user: Annotated[dict, Depends(get_current_user)]):
    if not current_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
        )
    
    return current_user
