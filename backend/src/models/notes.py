from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey

from ..database import Base

class Notes(Base):
    __tablename__ = "notes"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    body = Column(String)
    # created_at = Column(String)
    # updated_at = Column(String)
    # user_id = Column(Integer, ForeignKey("users.id"))
