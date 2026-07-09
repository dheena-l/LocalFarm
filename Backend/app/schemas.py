import re
from typing import Annotated

from pydantic import BaseModel
from pydantic import ConfigDict
from pydantic import EmailStr
from pydantic import Field
from pydantic import field_validator

PHONE_PATTERN = re.compile(r"^\d{10}$")


class BaseSecureModel(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    @field_validator("*", mode="before")
    @classmethod
    def normalize_strings(cls, value):
        if isinstance(value, str):
            return value.strip()
        return value


class ContactSchema(BaseSecureModel):
    name: Annotated[str, Field(min_length=2, max_length=80)]
    email: EmailStr
    phone: Annotated[str, Field(min_length=10, max_length=10)]
    message: Annotated[str, Field(max_length=1000)]

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, value: str) -> str:
        if not PHONE_PATTERN.fullmatch(value):
            raise ValueError("Phone must contain exactly 10 digits")
        return value


class EnquirySchema(BaseSecureModel):
    product_id: Annotated[int, Field(gt=0)]
    name: Annotated[str, Field(min_length=2, max_length=80)]
    email: EmailStr
    phone: Annotated[str, Field(min_length=10, max_length=10)]
    message: Annotated[str, Field(max_length=1000)]

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, value: str) -> str:
        if not PHONE_PATTERN.fullmatch(value):
            raise ValueError("Phone must contain exactly 10 digits")
        return value


class ProductCreate(BaseSecureModel):
    name: Annotated[str, Field(min_length=2, max_length=80)]
    price: Annotated[int, Field(gt=0)]
    category: Annotated[str, Field(min_length=2, max_length=50)]
    description: Annotated[str, Field(min_length=5, max_length=2000)]
    location: Annotated[str, Field(min_length=2, max_length=100)]
    image: str | None = None


class ProductResponse(ProductCreate):
    id: int
    model_config = ConfigDict(from_attributes=True)
