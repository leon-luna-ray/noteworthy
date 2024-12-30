from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from typing import List, Annotated
from datetime import datetime

from .. import models, schemas
from ..database import get_db, db_dependency
from .auth import get_current_user

router = APIRouter()

# /api/v1/notes
@router.get("/", status_code=status.HTTP_200_OK)
def get_notes(db: db_dependency, current_user: Annotated[dict, Depends(get_current_user)]):
    notes = db.query(models.Notes).filter(models.Notes.user_id == current_user['user_id']).all()
    return notes


# /api/v1/notes/new
@router.post("/new/", response_model=schemas.Note, status_code=status.HTTP_201_CREATED)
def create_note(note: schemas.NoteCreate, db: db_dependency, current_user: Annotated[dict, Depends(get_current_user)]):
    db_note = models.Notes(**note.dict(), user_id=current_user['user_id'], created_at=datetime.now(), updated_at=datetime.now())
    db.add(db_note)
    db.commit()
    db.refresh(db_note)
    
    return db_note