<template>
  <h1 class="text-xl font-bold mb-4">Редактировать валюту</h1>
  <CurrenciesForm
    :currency="currency"
    @submit="submit"
    buttonText="Сохранить"
  />
</template>

<script setup>
import CurrenciesForm from "@/components/forms/CurrenciesForm.vue";
import { useRoute, useRouter } from "vue-router";
import {
  getCurrencyById,
  updateCurrency,
} from "@/utils/api/server/currency.js";

const route = useRoute();
const router = useRouter();
const id = route.params.id;

const { data: currencyData } = await useAsyncData("currency", () =>
  getCurrencyById(id).then((res) => res.data)
);

const currency = currencyData.value || {};

const handleSuccess = () => router.push("/currencies");

const submit = async (formData) => {
  try {
    await updateCurrency(id, formData);
    handleSuccess();
  } catch (e) {
  } finally {
    handleSuccess();
  }
};
</script>
