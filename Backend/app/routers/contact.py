from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Contact
from app.schemas import ContactSchema
from app.email_service import send_contact_email
from app.main import require_api_key

router = APIRouter()


@router.post("/contacts")
def create_contact(
    contact: ContactSchema,
    db: Session = Depends(get_db),
    _: str = Depends(require_api_key),
):

    new_contact = Contact(
        name=contact.name,
        email=contact.email,
        phone=contact.phone,
        message=contact.message
    )

    try:
        db.add(new_contact)
        db.commit()
        db.refresh(new_contact)
    except Exception:
        db.rollback()
        raise

    send_contact_email(
        contact.name,
        contact.email,
        contact.phone,
        contact.message
    )

    return {
        "status": True,
        "message": "Message sent"
    }