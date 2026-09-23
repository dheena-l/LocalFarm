from pathlib import Path
import shutil
from uuid import uuid4

from fastapi import APIRouter, Body, Depends, File, Form, HTTPException, UploadFile
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Product
from app.schemas import ProductCreate, ProductResponse
from app.main import require_api_key

router = APIRouter()

UPLOAD_DIR = Path(__file__).resolve().parents[1] / "uploads"
UPLOAD_DIR.mkdir(exist_ok=True)
ALLOWED_IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".jfif", ".avif"}
MAX_IMAGE_SIZE_BYTES = 2 * 1024 * 1024


def normalize_image_path(image: str | None) -> str | None:
    if not image:
        return None

    cleaned = image.replace("\\", "/")
    cleaned = cleaned.lstrip("/")

    if cleaned.startswith("uploads/"):
        cleaned = cleaned[len("uploads/"):]

    return cleaned or None


def save_uploaded_image(image: UploadFile | None) -> str | None:
    if not image or not image.filename:
        return None

    file_name = Path(image.filename).name
    if not file_name or file_name in {".", ".."}:
        raise HTTPException(status_code=400, detail="Invalid image filename")

    extension = Path(file_name).suffix.lower()
    if extension not in ALLOWED_IMAGE_EXTENSIONS:
        raise HTTPException(status_code=400, detail="Unsupported image format")

    image_bytes = image.file.read()
    if len(image_bytes) > MAX_IMAGE_SIZE_BYTES:
        raise HTTPException(status_code=400, detail="Image too large")

    image.file.seek(0)
    image_name = f"{uuid4().hex}{extension}"
    image_path = UPLOAD_DIR / image_name
    with image_path.open("wb") as buffer:
        buffer.write(image_bytes)

    return normalize_image_path(image_name)


@router.post("/products", response_model=ProductResponse)
def create_product(
    name: str | None = Form(default=None, min_length=2, max_length=80),
    price: int | None = Form(default=None, gt=0),
    category: str | None = Form(default=None, min_length=2, max_length=50),
    description: str | None = Form(default=None, min_length=5, max_length=2000),
    location: str | None = Form(default=None, min_length=2, max_length=100),
    image: UploadFile | None = File(default=None),
    product_data: ProductCreate | None = Body(default=None),
    db: Session = Depends(get_db),
    _: str = Depends(require_api_key),
):
    if product_data is not None:
        name = product_data.name
        price = product_data.price
        category = product_data.category
        description = product_data.description
        location = product_data.location
        image_name = normalize_image_path(product_data.image)
    else:
        if any(value is None for value in [name, price, category, description, location]):
            raise HTTPException(status_code=422, detail="Provide product fields as form-data or JSON")
        image_name = save_uploaded_image(image)

    product = Product(
        name=name,
        price=price,
        category=category,
        description=description,
        location=location,
        image=image_name,
    )

    try:
        db.add(product)
        db.commit()
        db.refresh(product)
    except Exception:
        db.rollback()
        raise

    return product


@router.post("/products/bulk", response_model=list[ProductResponse])
def create_products_bulk(products: list[ProductCreate], db: Session = Depends(get_db), _: str = Depends(require_api_key)):
    product_objects = [
        Product(
            name=product.name,
            price=product.price,
            category=product.category,
            description=product.description,
            location=product.location,
            image=normalize_image_path(product.image),
        )
        for product in products
    ]

    try:
        db.add_all(product_objects)
        db.commit()
    except Exception:
        db.rollback()
        raise

    for product in product_objects:
        db.refresh(product)
        product.image = normalize_image_path(product.image)

    return product_objects


@router.get("/products", response_model=list[ProductResponse])
def get_products(db: Session = Depends(get_db)):
    products = db.query(Product).order_by(Product.id.desc()).all()

    for product in products:
        product.image = normalize_image_path(product.image)

    return products


@router.get("/products/{product_id}", response_model=ProductResponse)
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    product.image = normalize_image_path(product.image)
    return product
