import os
from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI, Header, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.database import Base
from app.database import engine

Base.metadata.create_all(
    bind=engine
)

load_dotenv()

API_KEY = os.getenv("LOCALFARM_API_KEY", "localfarm-admin-key")


def require_api_key(x_api_key: str | None = Header(default=None)):
    if x_api_key != API_KEY:
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