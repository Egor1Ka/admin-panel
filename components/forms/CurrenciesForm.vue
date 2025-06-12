<template>
  <form @submit.prevent="onSubmit" class="mt-8 space-y-4">
    <AdminInput
      v-model.trim="form.name"
      label="Название"
      placeholder="Введите название валюты"
    />
    <AdminInput
      v-model.trim="form.symbol"
      label="Символ"
      placeholder="Введите символ валюты"
    />
    <AdminInput
      v-model.trim="form.code"
      label="Код"
      placeholder="Введите код валюты"
    />

    <button
      type="submit"
      class="w-full bg-blue-600 text-white py-4 rounded-xl text-lg font-semibold shadow hover:bg-blue-700 transition cursor-pointer"
    >
      {{ props.buttonText }}
    </button>
  </form>
</template>

<script setup>
import { reactive, watch } from "vue";
import AdminInput from "@/components/UI/AdminInput.vue";

const props = defineProps({
  currency: {
    type: Object,
    default: () => ({ symbol: "", name: "", code: "" }),
  },
  buttonText: {
    type: String,
    default: "Сохранить",
  },
});

const emit = defineEmits(["submit"]);

const form = reactive({
  symbol: "",
  name: "",
  code: "",
});

watch(
  () => props.currency,
  (newCurrency) => {
    if (newCurrency) {
      Object.assign(form, newCurrency);
    }
  },
  { immediate: true, deep: true }
);

function onSubmit() {
  // Отправляем копию, чтобы не перезаписывать исходный объект
  emit("submit", { ...form });
}
</script>
