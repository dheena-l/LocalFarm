import pytest
from pydantic import ValidationError

from app.schemas import ContactSchema, EnquirySchema, ProductCreate


def test_contact_schema_rejects_non_numeric_phone():
    with pytest.raises(ValidationError):
        ContactSchema(
            name="John Doe",
            email="john@example.com",
            phone="abc123",
            message="Hello from the farm",
        )


def test_enquiry_schema_requires_positive_product_id():
    with pytest.raises(ValidationError):
        EnquirySchema(
            product_id=0,
            name="Jane",
            phone="9876543210",
            message="Interested in this product",
        )


def test_product_create_rejects_negative_price():
    with pytest.raises(ValidationError):
        ProductCreate(
            name="Banana",
            price=-10,
            category="Fruit",
            description="Fresh bananas",
            location="Coimbatore",
        )
