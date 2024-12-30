from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Annotated
from .. import models, schemas
from ..database import get_db, db_dependency
from .auth import get_current_user

router = APIRouter()

# /api/v1/notes
@router.get("/", status_code=status.HTTP_200_OK)
def get_notes(db: db_dependency):
    print("🍒 get_notes")


# /api/v1/notes/new
@router.post("/new/", response_model=schemas.Note)
def create_note(note: schemas.NoteCreate, db: db_dependency):
    print("🍒 DO SOMETHING")
    db_note = models.Notes(**note.dict())
    db.add(db_note)
    db.commit()
    db.refresh(db_note)
    return db_note