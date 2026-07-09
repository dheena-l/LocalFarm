from fastapi import APIRouter
from fastapi import BackgroundTasks
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
    background_tasks: BackgroundTasks,
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

    background_tasks.add_task(
        send_contact_email,
        enquiry.name,
        enquiry.email,
        enquiry.phone,
        enquiry.message,
    )

    return {
        "status": True,
        "message": "Enquiry Submitted"
    }