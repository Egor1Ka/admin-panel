import { apiFetch } from "./api";

const getCurrencies = async () => {
  return await apiFetch("/currency");
};

export { getCurrencies };
