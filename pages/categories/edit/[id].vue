<template>
  <CategoryForm
    :loading="loading"
    :category="category"
    :categories="normalizedCategories"
    :error="error"
    :attributes="attributes"
    @submit="submit"
  />
</template>

<script setup>
import { ref } from "vue";
import CategoryForm from "@/components/forms/CategoryForm.vue";
import {
  getCategoryById,
  updateCategory,
} from "@/utils/api/server/category.js";
import { useRoute, useRouter } from "vue-router";
import { getAttributes } from "~/utils/api/server/attributes";
import { bufferToBase64 } from "@/utils/bufferToBase64.js";

const route = useRoute();
const router = useRouter();
const id = route.params.id;

const loading = ref(false);

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

const { data: attributes } = await useAsyncData("attributes", () =>
  getAttributes().then((res) => {
    return res.data;
  })
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
    console.log("formData", formData);
    loading.value = true;
    const normalizedRequestData = normalizeRequest(formData);
    await updateCategory(id, normalizedRequestData);
    loading.value = false;
  } catch (e) {
    error.value = e.message || "Ошибка при создании категории";
  } finally {
    loading.value = false;
    handleSuccess();
  }
};
</script>
