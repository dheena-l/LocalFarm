from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Enquiry
from app.schemas import EnquirySchema
from app.email_service import send_contact_email
from app.main import require_api_key

router = APIRouter()


@router.post("/enquiry")
def create_enquiry(
    enquiry: EnquirySchema,
    db: Session = Depends(get_db),
    _: str = Depends(require_api_key),
):

    data = Enquiry(
        product_id=enquiry.product_id,
        name=enquiry.name,
        phone=enquiry.phone,
        message=enquiry.message
    )

    try:
        db.add(data)
        db.commit()
        db.refresh(data)
    except Exception:
        db.rollback()
        return {
            "status": False,
            "message": "Unable to save your enquiry. Please try again later."
        }

    try:
        send_contact_email(
            enquiry.name,
            enquiry.email,
            enquiry.phone,
            enquiry.message,
        )
    except Exception as exc:
        return {
            "status": False,
            "message": f"Your enquiry was saved, but the email could not be sent: {exc}"
        }

    return {
        "status": True,
        "message": "Enquiry Submitted"
    }