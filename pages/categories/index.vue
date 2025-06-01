<template>
  <CategoryTable :categories="categories" />
</template>

<script setup>
import CategoryTable from "~/components/tables/CategoryTable.vue";
import { getCategories } from "@/utils/api/server/category.js";
const { data: categoriesData } = await useAsyncData("categories", () =>
  getCategories().then((res) => res.data)
);

const categories = categoriesData.value || [];
console.log("categories", categories);
</script>
