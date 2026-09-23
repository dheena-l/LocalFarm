/**
 * productsService.js
 * ---------------------------------------------------------------------------
 * This is the ONLY place product data comes from in this build.
 *
 * The app is 100% frontend: there is no live database and no backend API
 * call happens anywhere in this project. All product data is defined in
 * `src/data/products.json` and all product images are bundled locally from
 * `src/assets/`. This file simply reads that local data and shapes it the
 * same way a real API response would be shaped, so pages can be written as
 * if they were talking to a backend (useEffect + fetch-style calls) even
 * though everything actually resolves instantly and locally.
 *
 * If a real backend is added later, `apiClient.js` in this same folder
 * shows where the network calls would plug in — swap the bodies of
 * `fetchProducts` / `fetchProductById` below for real calls and nothing
 * else in the app needs to change, because pages only import from here.
 * ---------------------------------------------------------------------------
 */

import rawProducts from "../data/products.json";

// Eagerly import every image in src/assets so we can look one up by
// filename (e.g. "chicken.avif") the same way a real API would return
// an image filename/path for the frontend to resolve.
const assetModules = import.meta.glob("../assets/*.{png,jpg,jpeg,jfif,avif,webp,svg}", {
  eager: true,
  as: "url",
});

const ASSET_MAP = Object.fromEntries(
  Object.entries(assetModules).map(([path, url]) => [path.split("/").pop(), url])
);

const FALLBACK_IMAGE = ASSET_MAP["vegetables.jpg"] || "";

const normalizeProduct = (product) => ({
  ...product,
  id: Number(product.id),
  name: product.title || product.name || "Farm Product",
});

const normalizeProducts = (products) =>
  Array.isArray(products) ? products.map(normalizeProduct) : [];

const ALL_PRODUCTS = normalizeProducts(rawProducts);

/** Synchronous accessor used to render something instantly on first paint. */
export const getInitialProducts = () => ALL_PRODUCTS;

/**
 * Async on purpose — mirrors the shape of a real "GET /products" call
 * (`useEffect(() => { fetchProducts().then(setProducts) }, [])`) so this
 * function is a drop-in replacement if a backend is wired up later.
 */
export const fetchProducts = async () => ALL_PRODUCTS;

export const fetchProductById = async (id) => {
  const productId = Number(id);
  return ALL_PRODUCTS.find((product) => product.id === productId);
};

/**
 * Resolves a product's `image` field (a local filename, e.g. "milk.png")
 * to a bundled asset URL. Falls back to a generic farm photo, or to a
 * caller-supplied fallback / full URL if one is given.
 */
export const getProductImageUrl = (image, fallbackImage = FALLBACK_IMAGE) => {
  if (!image) return fallbackImage;

  // Already a full URL (e.g. a direct image link pasted into the data file).
  if (/^https?:\/\//i.test(image)) return image;

  const fileName = String(image).replace(/^uploads\//, "").trim();
  return ASSET_MAP[fileName] || fallbackImage;
};

export const getAllCategories = () => [
  ...new Set(ALL_PRODUCTS.map((product) => product.category)),
];
