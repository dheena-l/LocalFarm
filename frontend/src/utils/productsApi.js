import axios from "axios";
import fallbackProducts from "../data/products.json";

const API = import.meta.env.VITE_API_URL;
const PRODUCTS_CACHE_KEY = "localfarm-products-cache";

const normalizeProduct = (product) => ({
  ...product,
  id: Number(product.id),
  name: product.name || product.title || "Farm Product",
});

const normalizeProducts = (products) =>
  Array.isArray(products) ? products.map(normalizeProduct) : [];

const readCachedProducts = () => {
  try {
    return normalizeProducts(JSON.parse(localStorage.getItem(PRODUCTS_CACHE_KEY)));
  } catch (error) {
    console.warn("Could not read cached products", error);
    return [];
  }
};

const writeCachedProducts = (products) => {
  try {
    localStorage.setItem(PRODUCTS_CACHE_KEY, JSON.stringify(products));
  } catch (error) {
    console.warn("Could not cache products", error);
  }
};

let productsRequest;

export const getInitialProducts = () => {
  const cachedProducts = readCachedProducts();
  return cachedProducts.length ? cachedProducts : normalizeProducts(fallbackProducts);
};

export const fetchProducts = async () => {
  if (!API) {
    return getInitialProducts();
  }

  if (!productsRequest) {
    productsRequest = axios
      .get(`${API}/products`)
      .then((response) => {
        const products = normalizeProducts(response.data);
        writeCachedProducts(products);
        return products;
      })
      .finally(() => {
        productsRequest = null;
      });
  }

  return productsRequest;
};

export const fetchProductById = async (id) => {
  const productId = Number(id);
  const initialProduct = getInitialProducts().find((product) => product.id === productId);

  if (!API) {
    return initialProduct;
  }

  try {
    const response = await axios.get(`${API}/products/${productId}`);
    return normalizeProduct(response.data);
  } catch (error) {
    if (initialProduct) {
      return initialProduct;
    }
    throw error;
  }
};

export const getProductImageUrl = (image, fallbackImage = "") => {
  const imagePath = image ? String(image).replace(/^uploads\//, "") : "";

  if (!imagePath) {
    return fallbackImage;
  }

  if (/^https?:\/\//i.test(imagePath)) {
    return imagePath;
  }

  return API ? `${API}/uploads/${imagePath}` : `/${imagePath}`;
};
