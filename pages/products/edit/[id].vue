<template>
  <h1 class="text-xl font-bold mb-4">Редактировать продукт</h1>
  <ProductForm
    :product="product"
    :categories="normalizedCategories"
    :currencies="normalizedCurrencies"
    button-text="Сохранить изменения"
    @submit="submit"
  />
</template>

<script setup>
import ProductForm from "@/components/forms/ProductForm.vue";
import { useRoute, useRouter } from "vue-router";
import { getProductById, updateProduct } from "@/utils/api/server/product.js";
import { getCategories } from "@/utils/api/server/category.js";
import { getCurrencies } from "@/utils/api/server/currency.js";

const route = useRoute();
const router = useRouter();
const id = route.params.id;

const categoriesMapper = ({ _id, name }) => ({
  id: _id,
  title: name,
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

const categories = categoriesData.value || [];

const currencies = currenciesData.value || [];

const normalizedCategories = categories.map(categoriesMapper);
const normalizedCurrencies = currencies.map(currenciesMapper);
const product = productData.value || {};

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
    const normalizedRequestData = normalizeRequest(formData);
    await updateProduct(id, normalizedRequestData);
  } catch (e) {
    // error.value = e.message || "Ошибка при создании категории";
  } finally {
    handleSuccess();
  }
};
</script>
