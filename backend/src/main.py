from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from decouple import config, Csv

from . import models
from .database import engine
from .routes import notes_router, auth_router

ENV = config("ENV")
CORS_ALLOWED_ORIGINS = config("CORS_ALLOWED_ORIGINS", default="", cast=Csv())

docs_url = None if ENV != "dev" else "/docs"
redoc_url = None if ENV != "dev" else "/redoc"
print(f"🍒 ENV: {ENV}")
print(docs_url, redoc_url)
app = FastAPI(docs_url='/docs', redoc_url=redoc_url)

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(notes_router, prefix="/api/v1/notes", tags=["notes"])
app.include_router(auth_router, prefix="/api/v1/auth", tags=["auth"])

app.mount("/", StaticFiles(directory="src/static", html=True), name="static")

models.Base.metadata.create_all(bind=engine)
