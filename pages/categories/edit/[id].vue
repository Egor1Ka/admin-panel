<template>
  <CategoryForm
    :category="category"
    :categories="normalizedCategories"
    :error="error"
    @submit="submit"
  />
</template>

<script setup>
import CategoryForm from "@/components/forms/Category.vue";
import {
  getCategoryById,
  updateCategory,
} from "@/utils/api/server/category.js";
import { useRoute, useRouter } from "vue-router";
import { bufferToBase64 } from "@/utils/bufferToBase64.js";

const route = useRoute();
const router = useRouter();
const id = route.params.id;

const categoriesMapper = ({ _id, name }) => ({
  id: _id,
  title: name,
});

const { data: categoriesData } = await useAsyncData("categories", () =>
  getCategories().then((res) => res.data)
);

const { data: categoryData, error } = await useAsyncData("category", () =>
  getCategoryById(id).then((res) => res.data)
);

const category = categoryData.value;

const categories = categoriesData.value || [];
const normalizedCategories = categories.map(categoriesMapper);

const handleSuccess = () => router.push("/categories");

const normalizeRequest = (formData) => {
  const { parentId } = formData;

  return {
    ...formData,
    parentId: parentId ? parentId : null,
  };
};

const submit = async (formData) => {
  try {
    const normalizedRequestData = normalizeRequest(formData);
    await updateCategory(id, normalizedRequestData);
  } catch (e) {
    error.value = e.message || "Ошибка при создании категории";
  } finally {
    handleSuccess();
  }
};
</script>
