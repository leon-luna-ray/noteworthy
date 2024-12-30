from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from typing import List, Annotated
from datetime import datetime

from .. import models, schemas
from ..database import db_dependency
from .auth import get_current_user

router = APIRouter()

# /api/v1/notes
@router.get("/", status_code=status.HTTP_200_OK)
def get_notes(db: db_dependency, current_user: Annotated[dict, Depends(get_current_user)]):
    notes = db.query(models.Notes).filter(models.Notes.user_id == current_user['user_id']).all()
    return notes

# /api/v1/notes/{note_id}
@router.get("/{note_id}/", response_model=schemas.Note, status_code=status.HTTP_200_OK)
def get_note(note_id: int, db: db_dependency, current_user: Annotated[dict, Depends(get_current_user)]):
    note = db.query(models.Notes).filter(models.Notes.id == note_id, models.Notes.user_id == current_user['user_id']).first()
    if note is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Note not found")
    return note

# /api/v1/notes/new
@router.post("/new/", response_model=schemas.Note, status_code=status.HTTP_201_CREATED)
def create_note(note: schemas.NoteCreate, db: db_dependency, current_user: Annotated[dict, Depends(get_current_user)]):
    db_note = models.Notes(**note.dict(), user_id=current_user['user_id'], created_at=datetime.now(), updated_at=datetime.now())
    db.add(db_note)
    db.commit()
    db.refresh(db_note)
    
    return db_note

# /api/v1/notes/{note_id}/
@router.put("/{note_id}/", response_model=schemas.Note, status_code=status.HTTP_200_OK)
def update_note(note_id: int, note: schemas.NoteUpdate, db: db_dependency, current_user: Annotated[dict, Depends(get_current_user)]):
    db_note = db.query(models.Notes).filter(models.Notes.id == note_id, models.Notes.user_id == current_user['user_id']).first()
    if db_note is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Note not found")
    
    db_note.title = note.title
    db_note.body = note.body
    db_note.updated_at = datetime.now()
    db.commit()
    db.refresh(db_note)
    
    return db_note

# /api/v1/notes/{note_id}/
@router.delete("/{note_id}/", status_code=status.HTTP_204_NO_CONTENT)
def delete_note(note_id: int, db: db_dependency, current_user: Annotated[dict, Depends(get_current_user)]):
    db_note = db.query(models.Notes).filter(models.Notes.id == note_id, models.Notes.user_id == current_user['user_id']).first()
    if db_note is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Note not found")
    
    db.delete(db_note)
    db.commit()
    return