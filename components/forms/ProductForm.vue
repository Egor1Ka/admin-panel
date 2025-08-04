<template>
  <form @submit.prevent="onSubmit" class="mt-8">
    <div class="flex gap-6 mb-6">
      <!-- Левая колонка -->
      <div class="flex-1 bg-white rounded-2xl shadow p-8 flex flex-col gap-6">
        <h2 class="text-2xl font-bold mb-4 text-gray-900">Основное</h2>

        <div class="flex-1 flex gap-6">
          <div>
            <label class="block mb-1">Категория</label>
            <select
              :disabled="!!productProps.categoryId"
              class="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-blue-500"
              v-model="form.categoryId"
            >
              <option value="">Выберите категорию</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                {{ cat.title }}
              </option>
            </select>
          </div>

          <div class="flex-1">
            <AdminInput
              v-model="form.name"
              :label="'Название'"
              placeholder="Введите название"
              required
              class="w-full"
            />
          </div>
        </div>

        <!-- Название и Описание (в строку) -->
        <div class="flex gap-4">
          <div class="flex-1">
            <label class="block mb-1 font-medium text-gray-700">Описание</label>
            <textarea
              v-model="form.description"
              placeholder="Опишите продукт"
              class="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-blue-500"
            />
          </div>
        </div>

        <!-- Цена, валюта, количество (в строку) -->
        <div class="flex gap-4">
          <div class="flex-1">
            <AdminInput
              type="number"
              v-model.number="form.defaultPrice"
              :label="'Цена'"
              class="input-base w-full"
              required
            />
          </div>
          <div class="flex-1">
            <label class="block mb-1 font-medium text-gray-700">Валюта</label>
            <select v-model="form.currency" class="input-base w-full">
              <option v-for="cur in currencies" :key="cur.id" :value="cur.id">
                {{ cur.code }}
              </option>
            </select>
          </div>
          <div class="flex-1">
            <AdminInput
              type="number"
              v-model.number="form.quantity"
              :label="'Количество'"
              class="input-base w-full"
              required
            />
          </div>
        </div>

        <!-- Статус -->
        <div>
          <label class="block mb-1 font-medium text-gray-700">Статус</label>
          <select v-model="form.status" class="input-base w-full">
            <option value="draft">Черновик</option>
            <option value="published">Опубликовано</option>
            <option value="archived">Архив</option>
          </select>
        </div>
      </div>

      <!-- Правая колонка -->
      <div class="w-1/3">
        <div class="bg-white rounded-2xl shadow p-4">
          <span
            class="text-lg font-semibold mb-2 text-gray-900 block text-center"
            >Фото продукта</span
          >
          <MultiUploadImage v-model="form.images" label="Фото продукта" />
        </div>
      </div>
    </div>

    <!-- Варианты товара -->
    <h3 class="text-xl font-bold mb-4" v-if="form.variants.length">
      Варианты товара
    </h3>

    <ProducyVariantsBlock
      v-if="form.variants.length || categoryAttrs.attributes?.length"
      v-model:variants="form.variants"
      :categoryAttrs="categoryAttrs"
      :currencies="currencies"
      @add-variant="addVariant"
      :categoryId="form.categoryId"
    />

    <AdminButton :disabled="loading">
      <template #text>
        {{ buttonText }}
      </template>
    </AdminButton>
  </form>
</template>

<script setup>
import { ref, watch } from "vue";
import ProducyVariantsBlock from "@/components/forms/blocks/ProducyVariantsBlock.vue";
import MultiUploadImage from "@/components/UI/MultiUploadImage.vue";
import AdminInput from "@/components/UI/AdminInput.vue";
import AdminButton from "../UI/AdminButton.vue";

const {
  product: productProps,
  categories,
  currencies,
  buttonText,
  categoryAttrs,
  loading,
} = defineProps({
  product: { type: Object, default: () => ({}) },
  categories: { type: Array, default: () => [] },
  currencies: { type: Array, default: () => [] },
  categoryAttrs: { type: Object, default: () => ({}) },
  buttonText: { type: String, default: "Создать продукт" },
  loading: { type: Boolean, default: false },
});
const emit = defineEmits(["submit", "getCategoryValues"]);

const form = ref({
  images: [],
  quantity: 0,
  defaultPrice: 0,
  name: "",
  currency: "",
  description: "",
  categoryId: "",
  tags: [],
  status: "draft",
  attributes: {},
  variants: [],
});

watch(
  () => productProps,
  (prod) => {
    if (prod && Object.keys(prod).length) {
      form.value = {
        ...prod,
        images: prod.images ? [...prod.images] : [],
        tags: prod.tags ? [...prod.tags] : [],
        variants: prod.variants ? [...prod.variants] : [],
        attributes: prod.attributes ? { ...prod.attributes } : {},
        description: prod.description || "",
        categoryId:
          typeof prod.categoryId === "object" && prod.categoryId?._id
            ? prod.categoryId._id
            : prod.categoryId || "",
      };
    }
  },
  { immediate: true }
);

onMounted(() => {
  if (productProps.categoryId) {
    emit("getCategoryValues", productProps.categoryId._id);
  }
});

watch(
  () => form.value.categoryId,
  (newValue) => {
    emit("getCategoryValues", newValue);
  }
);

const addVariant = () => {
  const getDefaultAttributes = (attribut) => {
    return {
      value: "",
      attribute: attribut._id,
    };
  };

  form.value.variants.push({
    sku: "",
    attributes: categoryAttrs.attributes.map(getDefaultAttributes),
    price: 0,
    currency: "",
    quantity: 0,
    images: [],
  });
};

watch(
  () => categoryAttrs.attributes,
  (attrs) => {
    if (
      form.value.variants.length === 0 &&
      Array.isArray(attrs) &&
      attrs.length > 0
    ) {
      addVariant();
    }
  }
);

function onSubmit() {
  emit("submit", { ...form.value });
}
</script>
