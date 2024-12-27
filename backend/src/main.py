from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from typing import Annotated
from pydantic import BaseModel
from sqlalchemy.orm import Session

from .database import engine, SessionLocal

from . import models
from . import schemas

app = FastAPI()
models.Base.metadata.create_all(bind=engine)

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:5173"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/notes/", response_model=schemas.Note)
def create_note(note: schemas.NoteCreate, db: Session = Depends(get_db)):
    db_note = models.Notes(**note.dict())
    db.add(db_note)
    db.commit()
    db.refresh(db_note)
    return db_note

