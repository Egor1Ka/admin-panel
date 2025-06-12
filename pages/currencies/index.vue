<template>
  <div class="flex mb-6 justify-between">
    <h1 class="text-xl font-bold mb-4">Валюта</h1>
    <NuxtLink
      to="/currencies/create"
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
      Создать Валюту
    </NuxtLink>
  </div>
  <CurrencyTable :currencies="currencies" />
</template>

<script setup>
import CurrencyTable from "@/components/tables/CurrencyTable.vue";
import { getCurrencies } from "@/utils/api/server/currency.js";

const { data: currencyData } = await useAsyncData("currencies", () =>
  getCurrencies().then((res) => res.data)
);

const currencies = currencyData.value || [];
</script>
