import { apiFetch } from "./api";

const createCategory = async (data) => {
  return apiFetch("/category", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
const getCategoryById = async (id) => {
  return await apiFetch(`/category/${id}`);
};
const getCategories = async () => {
  return apiFetch("/category");
};
const updateCategory = async (id, data) => {
  return await apiFetch(`/category/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export { createCategory, getCategoryById, getCategories, updateCategory };
