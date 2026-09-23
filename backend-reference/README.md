# backend-reference (NOT wired up — reference only)

This folder is **not used by the frontend** and is not run as part of this
project. It exists purely as a **mock/reference architecture** showing how a
real backend for LocalFarm could be organized, so the shape of a future
implementation is documented alongside the UI.

Nothing in `../src` imports, calls, or depends on anything in this folder.

## What it shows

A small FastAPI service with:

- `app/main.py` — app setup, CORS, static `/uploads` mount, a simple
  `X-API-Key` header check for write operations.
- `app/models.py` / `app/schemas.py` — SQLAlchemy models and Pydantic
  request/response schemas for `Product`, `Contact`, and `Enquiry`.
- `app/routers/products.py` — `GET /products`, `GET /products/{id}`,
  `POST /products`, `POST /products/bulk` (image upload + validation).
- `app/routers/contact.py` — `POST /contact`.
- `app/routers/enquiry.py` — `POST /enquiry`.
- `app/database.py` / `app/config.py` — DB session & environment loading.
- `app/email_service.py` — outbound email notifications for contact/enquiry.
- `tests/` — a couple of example tests for the schemas and API key check.

## If you want to actually run it later

1. `pip install -r requirements.txt`
2. Set up a database connection in `app/config.py` / your `.env`.
3. `uvicorn app.main:app --reload`
4. In the frontend, set `VITE_API_URL` to point at it, and swap the mock
   logic in `src/services/productsService.js` for the real calls sketched
   in `src/services/apiClient.js`.

Until then, this is documentation, not a dependency.
