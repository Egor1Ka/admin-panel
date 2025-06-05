<template>
  <div class="flex mb-6 justify-between">
    <h1 class="text-xl font-bold mb-4">Атрибуты</h1>
    <NuxtLink
      to="/attributes/create"
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
      Создать атрибут
    </NuxtLink>
  </div>
  <AttributeTable :attributes="attributesData" />
</template>

<script setup>
import { getAttributes } from "@/utils/api/server/attributes";
import AttributeTable from "@/components/tables/AttributeTable.vue";

const { data: attributesData } = await useAsyncData("attributes", () =>
  getAttributes().then((res) => res.data)
);
</script>
