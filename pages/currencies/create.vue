<template>
  <h1 class="text-xl font-bold mb-4">Создать валюту</h1>
  <CurrenciesForm @submit="submit" buttonText="Создать" />
</template>

<script setup>
import CurrenciesForm from "@/components/forms/CurrenciesForm.vue";
import { useRouter } from "vue-router";
import { createCurrency } from "@/utils/api/server/currency.js";

const router = useRouter();

const handleSuccess = () => router.push("/currencies");

const submit = async (formData) => {
  try {
    await createCurrency(formData);
    handleSuccess();
  } catch (e) {
  } finally {
    handleSuccess();
  }
};
</script>
