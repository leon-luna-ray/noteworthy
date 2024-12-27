from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey

from ..database import Base

class Users(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, index=True)
    password = Column(String)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)
