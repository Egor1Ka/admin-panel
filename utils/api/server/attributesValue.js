import { apiFetch } from "./api";

const createManyValues = async (values) => {
  return apiFetch("/attribute-values/batch", {
    method: "POST",
    body: JSON.stringify(values),
  });
};

const deleteManyValues = async (values) => {
  return apiFetch("/attribute-values/batch-delete", {
    method: "DELETE",
    body: JSON.stringify(values),
  });
};

export { createManyValues, deleteManyValues };
