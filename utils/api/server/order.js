import { apiFetch } from "./api";

const getOrders = async () => {
  return await apiFetch("/order");
};

export { getOrders };
