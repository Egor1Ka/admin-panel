<template>
  <h1 class="text-xl font-bold mb-4">{{ t("create_category") }}</h1>
  <CategoryForm @submit="onCreateCategory" :categories="normalizedCategories" />
</template>

<script setup>
// import CategoryForm from "@/components/forms/CategoryFormCreate.vue";
import CategoryForm from "@/components/forms/Category.vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { getCategories, createCategory } from "@/utils/api/server/category.js";

const categoriesMapper = ({ _id, name }) => ({
  id: _id,
  title: name,
});

const {
  data: categoriesData,
  pending,
  error,
} = await useAsyncData("categories", () =>
  getCategories().then((res) => res.data)
);

const categories = categoriesData.value || [];
const normalizedCategories = categories.map(categoriesMapper);

const router = useRouter();
const handleSuccess = () => router.push("/categories");

const onCreateCategory = async (formData) => {
  // formData = все данные из CategoryForm, включая картинку, slug и т.д.
  // loading.value = true;
  // error.value = "";
  try {
    // например, ты вызываешь свой API
    await createCategory(formData);
    // тут можешь делать редирект или пушить в список
    // router.push('/categories') или emit('success')
  } catch (e) {
    error.value = e.message || "Ошибка при создании категории";
  } finally {
    handleSuccess();
    //loading.value = false;
  }
};

const { t } = useI18n({
  messages: {
    ru: { create_category: "Создать категорию" },
  },
  locale: "ru",
});
</script>
