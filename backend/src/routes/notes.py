from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Annotated
from .. import models, schemas
from ..database import get_db

router = APIRouter()

db_dependency = Annotated[Session, Depends(get_db)]

@router.post("/", response_model=schemas.Note)
def create_note(note: schemas.NoteCreate, db: db_dependency):
    db_note = models.Notes(**note.dict())
    db.add(db_note)
    db.commit()
    db.refresh(db_note)
    return db_note

@router.get("/", response_model=List[schemas.Note])
def read_notes(db: db_dependency):
    notes = db.query(models.Notes).offset(skip).limit(limit).all()
    return notes

@router.get("/{note_id}", response_model=schemas.Note)
def read_note(note_id: int, db: db_dependency):
    note = db.query(models.Notes).filter(models.Notes.id == note_id).first()
    if note is None:
        raise HTTPException(status_code=404, detail="Note not found")
    return note

@router.put("/{note_id}", response_model=schemas.Note)
def update_note(note_id: int, note: schemas.NoteCreate, db: db_dependency):
    db_note = db.query(models.Notes).filter(models.Notes.id == note_id).first()
    if db_note is None:
        raise HTTPException(status_code=404, detail="Note not found")
    for key, value in note.dict().items():
        setattr(db_note, key, value)
    db.commit()
    db.refresh(db_note)
    return db_note

@router.delete("/{note_id}", response_model=schemas.Note)
def delete_note(note_id: int, db: db_dependency):
    db_note = db.query(models.Notes).filter(models.Notes.id == note_id).first()
    if db_note is None:
        raise HTTPException(status_code=404, detail="Note not found")
    db.delete(db_note)
    db.commit()
    return db_note