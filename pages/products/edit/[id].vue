<template>
  <h1 class="text-xl font-bold mb-4">Редактировать продукт</h1>
  <ProductForm
    :loading="loading"
    :product="product"
    :categories="normalizedCategories"
    :currencies="normalizedCurrencies"
    :categoryAttrs="categoryAttrs"
    button-text="Сохранить изменения"
    @submit="submit"
    @getCategoryValues="getCategoryValues"
  />
</template>

<script setup>
import { ref } from "vue";
import ProductForm from "@/components/forms/ProductForm.vue";
import { useRoute, useRouter } from "vue-router";
import { getProductById, updateProduct } from "@/utils/api/server/product.js";
import { getCategories } from "@/utils/api/server/category.js";
import { getCurrencies } from "@/utils/api/server/currency.js";
import { getCategoryAttrs } from "@/utils/api/server/category.js";

const route = useRoute();
const router = useRouter();
const id = route.params.id;

const categoryAttrs = ref({});
const loading = ref(false);

const categoriesMapper = ({ _id, name, attributes }) => ({
  id: _id,
  title: name,
  attributes,
});

const currenciesMapper = ({ symbol, code, _id }) => ({ symbol, code, id: _id });

const { data: productData } = await useAsyncData("product", () =>
  getProductById(id).then((res) => res.data)
);

const { data: categoriesData } = await useAsyncData("categories", () =>
  getCategories().then((res) => res.data)
);

const { data: currenciesData } = await useAsyncData("currencies", () =>
  getCurrencies().then((res) => res.data)
);

const product = productData.value || {};
const categories = categoriesData.value || [];
const currencies = currenciesData.value || [];

const normalizedCategories = categories.map(categoriesMapper);
const normalizedCurrencies = currencies.map(currenciesMapper);

const getCategoryValues = async (category) => {
  const { data } = await getCategoryAttrs(category);
  categoryAttrs.value = { ...data };
};

const handleSuccess = () => router.push("/products");

const normalizeRequest = (formData) => {
  const { parentId } = formData;
  const { categoryId } = formData;

  return {
    ...formData,
    categoryId: categoryId ? categoryId : null,
    parentId: parentId ? parentId : null,
  };
};

const submit = async (formData) => {
  try {
    loading.value = true;
    const normalizedRequestData = normalizeRequest(formData);
    await updateProduct(id, normalizedRequestData);
  } catch (e) {
    // error.value = e.message || "Ошибка при создании категории";
  } finally {
    loading.value = false;
    handleSuccess();
  }
};
</script>
