import { apiFetch } from "./api";

const createProduct = async (data) => {
  return await apiFetch("/product", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

const updateProduct = async (id, data) => {
  return await apiFetch(`/product/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

const getProducts = async () => {
  return await apiFetch("/product");
};

const getProductById = async (id) => {
  return await apiFetch(`/product/${id}`);
};

export { createProduct, getProducts, getProductById, updateProduct };
