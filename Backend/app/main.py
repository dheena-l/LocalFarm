import os
from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI, Header, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import logging

from app.database import Base
from app.database import engine

Base.metadata.create_all(
    bind=engine
)

load_dotenv()

API_KEY = os.getenv("LOCALFARM_API_KEY", "localfarm-admin-key")
FALLBACK_API_KEY = os.getenv("FRONTEND_API_KEY_FALLBACK", "localfarm-admin-key")

# Configure simple logging for debugging API key issues
logger = logging.getLogger(__name__)
if not logger.handlers:
    logging.basicConfig(level=logging.INFO)


def require_api_key(x_api_key: str | None = Header(default=None)):
    logger.info("Received X-API-Key: %s", x_api_key)
    if x_api_key not in (API_KEY, FALLBACK_API_KEY):
        raise HTTPException(status_code=401, detail="Invalid API key")
    return x_api_key


app = FastAPI()

from app.routers.contact import router as contact_router
from app.routers.enquiry import router as enquiry_router
from app.routers.products import router as products_router

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    contact_router
)

app.include_router(
    enquiry_router
)

app.include_router(
    products_router
)

UPLOAD_DIR = Path(__file__).resolve().parents[1] / "uploads"
app.mount("/uploads", StaticFiles(directory=str(UPLOAD_DIR)), name="uploads")