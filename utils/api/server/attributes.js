import { apiFetch } from "./api";

const getAttributes = async () => {
  return apiFetch("/attribute");
};

const getAttributeById = async (id) => {
  return apiFetch(`/attribute/${id}`);
};

const getAttributeValuesById = async (id) => {
  return apiFetch(`/attribute/${id}/values`);
};

const createAttribute = async (attribute) => {
  return apiFetch("/attribute", {
    method: "POST",
    body: JSON.stringify(attribute),
  });
};

export {
  getAttributes,
  getAttributeById,
  getAttributeValuesById,
  createAttribute,
};
