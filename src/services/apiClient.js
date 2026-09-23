/**
 * apiClient.js
 * ---------------------------------------------------------------------------
 * PLACEHOLDER ONLY — nothing in this project imports or calls this file.
 *
 * This project deliberately ships with NO working backend. Every screen
 * reads data from `productsService.js`, which in turn reads local JSON and
 * bundled images from `src/data` / `src/assets`. Contact and enquiry forms
 * open a pre-filled WhatsApp message instead of posting to a server.
 *
 * This file exists purely as a reference for a future developer who wants
 * to connect the real FastAPI backend that ships (as a reference only, not
 * wired up) in `/backend-reference` at the root of this project. It sketches
 * the same endpoints that backend exposes, so wiring it up later is a
 * matter of:
 *
 *   1. Deploying /backend-reference (or your own backend) somewhere.
 *   2. Setting VITE_API_URL in a .env file to that backend's base URL.
 *   3. Replacing the mock logic in productsService.js with the calls below.
 *   4. Doing the same for the contact/enquiry form submit handlers, which
 *      currently open WhatsApp directly in Contact.jsx and ProductDetails.jsx.
 *
 * Nothing here runs today. It's a map, not a road.
 * ---------------------------------------------------------------------------
 */

const BASE_URL = import.meta.env.VITE_API_URL || "";
const API_KEY = import.meta.env.VITE_API_KEY || "";

const authHeaders = () => (API_KEY ? { "X-API-Key": API_KEY } : {});

// GET /products  → list all products
export async function getProducts() {
  const res = await fetch(`${BASE_URL}/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

// GET /products/:id  → a single product
export async function getProductById(id) {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

// POST /products  → create a product (requires an admin API key)
export async function createProduct(product) {
  const res = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error("Failed to create product");
  return res.json();
}

// POST /contact  → save + email a contact message
export async function submitContact(payload) {
  const res = await fetch(`${BASE_URL}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to submit contact message");
  return res.json();
}

// POST /enquiry  → save + email a product enquiry
export async function submitEnquiry(payload) {
  const res = await fetch(`${BASE_URL}/enquiry`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to submit enquiry");
  return res.json();
}
