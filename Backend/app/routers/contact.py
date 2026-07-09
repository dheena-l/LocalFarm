from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Contact
from app.schemas import ContactSchema
from app.email_service import send_contact_email
from app.main import require_api_key
import logging

logger = logging.getLogger(__name__)

router = APIRouter()


@router.post("/contact")
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
        message=contact.message,
    )

    try:
        db.add(new_contact)
        db.commit()
        db.refresh(new_contact)
    except Exception:
        db.rollback()
        logger.exception("Failed to save contact message for: %s", contact.email)
        return {
            "status": False,
            "message": "Unable to save your message. Please try again later."
        }

    try:
        send_contact_email(
            contact.name,
            contact.email,
            contact.phone,
            contact.message,
        )
    except Exception as exc:
        logger.exception("Failed to send contact email for %s", contact.email)

    return {
        "status": True,
        "message": "Message saved successfully. We will notify you shortly."
    }
