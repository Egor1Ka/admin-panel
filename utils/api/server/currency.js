import { apiFetch } from "./api";

const getCurrencies = async () => {
  return await apiFetch("/currency");
};

const getCurrencyById = async (id) => {
  return await apiFetch(`/currency/${id}`);
};

const updateCurrency = async (id, data) => {
  return await apiFetch(`/currency/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

const createCurrency = async (data) => {
  return await apiFetch("/currency", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export { getCurrencies, getCurrencyById, updateCurrency, createCurrency };
