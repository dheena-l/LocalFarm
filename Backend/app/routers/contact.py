from fastapi import APIRouter
from fastapi import BackgroundTasks
from fastapi import Depends

from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Contact
from app.schemas import ContactSchema
from app.email_service import send_contact_email
import logging

logger = logging.getLogger(__name__)

router = APIRouter()


@router.post("/contacts")
def create_contact(
    contact: ContactSchema,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
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
        logger.exception("Failed to save contact message for: %s", contact.email)
        return {
            "status": False,
            "message": "Unable to save your message. Please try again later."
        }

    background_tasks.add_task(
        send_contact_email,
        contact.name,
        contact.email,
        contact.phone,
        contact.message,
    )
    except Exception:
        logger.exception("Failed to send contact email for: %s", contact.email)
        return {
            "status": False,
            "message": "Failed to send email. Please try again later."
        }

    return {
        "status": True,
        "message": "Message sent"
    }