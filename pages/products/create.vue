<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-2xl font-bold mb-8">Создать продукт</h1>

    <ProductForm
      @submit="onCreateProduct"
      :categories="normalizedCategories"
      :currencies="normalizedCurrencies"
    />
  </div>
</template>

<script setup>
import ProductCreateForm from "@/components/forms/ProductCreateForm.vue";
import ProductForm from "~/components/forms/ProductForm.vue";

import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { getCategories } from "@/utils/api/server/category.js";
import { getCurrencies } from "@/utils/api/server/currency.js";
import { createProduct } from "@/utils/api/server/product";

const categoriesMapper = ({ _id, name }) => ({
  id: _id,
  title: name,
});

const currenciesMapper = ({ symbol, code, _id }) => ({ symbol, code, id: _id });

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

const router = useRouter();
const handleSuccess = () => router.push("/products");

const onCreateProduct = async (formData) => {
  //loading.value = true;
  //error.value = "";
  console.log("formData", formData);

  try {
    await createProduct(formData);
    handleSuccess();
  } catch (e) {
    console.log("error", e);
    // error.value = e.message || "Ошибка при создании";
  } finally {
    //loading.value = false;
  }
};

const { t } = useI18n({
  messages: {
    ru: { create_product: "Создать продукт" },
  },
  locale: "ru",
});
</script>
