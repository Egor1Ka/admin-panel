<template>
  <div class="flex mb-6 justify-between">
    <h1 class="text-xl font-bold mb-4">Категории</h1>
    <NuxtLink
      to="/categories/create"
      class="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold text-base shadow hover:bg-blue-700 transition active:scale-95"
    >
      <svg
        class="w-5 h-5"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 4v16m8-8H4"
        />
      </svg>
      Создать категорию
    </NuxtLink>
  </div>
  <CategoryTable :categories="categories" />
</template>

<script setup>
import CategoryTable from "~/components/tables/CategoryTable.vue";
import { getCategories } from "@/utils/api/server/category.js";
const { data: categoriesData } = await useAsyncData("categories", () =>
  getCategories().then((res) => res.data)
);

const categories = categoriesData.value || [];
</script>
