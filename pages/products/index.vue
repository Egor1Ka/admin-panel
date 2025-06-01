<template>
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
