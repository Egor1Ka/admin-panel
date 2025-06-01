<template>
  <div class="flex mb-6 justify-between">
    <h1 class="text-xl font-bold mb-4">Продукты</h1>
    <NuxtLink
      to="/products/create"
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
      Создать продукт
    </NuxtLink>
  </div>
  <ProductsTable :products="products" />
</template>

<script setup>
import ProductsTable from "@/components/tables/ProductsTable.vue";
import { getProducts } from "@/utils/api/server/product.js";

const { data: productsData } = await useAsyncData("products", () =>
  getProducts().then((res) => res.data)
);

const products = productsData.value || [];
</script>
