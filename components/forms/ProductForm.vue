<template>
  <form @submit.prevent="onSubmit" class="mt-8">
    <div class="flex gap-6 mb-6">
      <!-- Левая колонка -->
      <div class="flex-1 bg-white rounded-2xl shadow p-8 flex flex-col gap-6">
        <h2 class="text-2xl font-bold mb-4 text-gray-900">Основное</h2>

        <div class="flex-1 flex gap-6">
          <CategorySelect
            v-model="form.categoryId"
            :categories="categories"
            :disabled="isEditMode"
            :default-value="'Выберите категорию'"
            label="Категория"
            @change="onCategoryChange"
          />

          <div class="flex-1">
            <label class="block mb-1 font-medium text-gray-700">Название</label>
            <input
              v-model="form.name"
              placeholder="Введите название"
              class="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-blue-500"
              required
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
            <label class="block mb-1 font-medium text-gray-700">Цена</label>
            <input
              type="number"
              v-model.number="form.defaultPrice"
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
            <label class="block mb-1 font-medium text-gray-700"
              >Количество</label
            >
            <input
              type="number"
              v-model.number="form.quantity"
              class="input-base w-full"
              required
            />
          </div>
        </div>

        <!-- Теги -->
        <div>
          <label class="block mb-1 font-medium text-gray-700">Теги</label>
          <div
            class="flex flex-wrap items-center gap-2 border border-gray-300 rounded-lg p-2 bg-gray-50"
          >
            <span
              v-for="(tag, i) in form.tags"
              :key="i"
              class="bg-blue-100 text-blue-700 px-2 py-1 rounded flex items-center"
            >
              {{ tag }}
              <button
                type="button"
                class="ml-1 text-blue-500 hover:text-red-500"
                @click="removeTag(i)"
              >
                ×
              </button>
            </span>
            <input
              v-model="tagInput"
              @keydown.enter.prevent="addTag"
              placeholder="Новый тег"
              class="border-none outline-none flex-1 min-w-[80px] bg-transparent"
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
      v-if="form.variants.length"
      v-model:variants="form.variants"
      v-model:categoryAttrs="categoryAttrs"
      :currencies="currencies"
      @add-variant="addVariant"
    />

    <button
      class="w-full bg-blue-600 text-white py-4 rounded-xl text-lg font-semibold shadow hover:bg-blue-700 transition cursor-pointer"
      :disabled="loading"
    >
      {{ loading ? "Сохраняем..." : buttonText }}
    </button>
    <div v-if="error" class="text-red-500 text-center mt-2">{{ error }}</div>
  </form>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import CategorySelect from "@/components/CategorySelect.vue";
import ProducyVariantsBlock from "@/components/forms/blocks/ProducyVariantsBlock.vue";
import MultiUploadImage from "@/components/UI/MultiUploadImage.vue";

const props = defineProps({
  product: { type: Object, default: () => ({}) },
  categories: { type: Array, default: () => [] },
  currencies: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
  error: { type: String, default: "" },
  buttonText: { type: String, default: "Создать продукт" },
});
const emit = defineEmits(["submit"]);

const isEditMode = computed(() => !!props.product?._id);

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
const categoryAttrs = ref([]);
const tagInput = ref("");

// ================================
// Служебные функции
// ================================
function resetForm() {
  return {
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
  };
}

// Синхронизация вариантов с categoryAttrs
function syncVariantsWithAttrs() {
  form.value.variants = form.value.variants.map((variant) => {
    const attrs = { ...variant.attributes };
    categoryAttrs.value.forEach((attr) => {
      if (!(attr.name in attrs)) attrs[attr.name] = "";
    });
    Object.keys(attrs).forEach((key) => {
      if (!categoryAttrs.value.some((a) => a.name === key)) delete attrs[key];
    });
    return { ...variant, attributes: attrs };
  });
}

watch(
  () => props.product,
  async (prod) => {
    if (prod && Object.keys(prod).length) {
      form.value = {
        ...resetForm(),
        ...prod,
        images: prod.images ? [...prod.images] : [],
        tags: prod.tags ? [...prod.tags] : [],
        variants: prod.variants ? [...prod.variants] : [],
        attributes: prod.attributes ? { ...prod.attributes } : {},
        categoryId:
          typeof prod.categoryId === "object" && prod.categoryId?._id
            ? prod.categoryId._id
            : prod.categoryId || "",
      };
      // Получаем атрибуты категории
      if (form.value.categoryId) {
        await fetchCategoryAttrs(form.value.categoryId);
      } else if (
        form.value.variants.length &&
        form.value.variants[0].attributes
      ) {
        // Если нет категории, но есть варианты — делаем categoryAttrs из варианта
        categoryAttrs.value = Object.keys(
          form.value.variants[0].attributes
        ).map((name) => ({ name, type: "string" }));
      }
      syncVariantsWithAttrs();
    } else {
      resetForm();
    }
  },
  { immediate: true }
);
// Следим за категорией (для create)
function onCategoryChange(catId) {
  if (!isEditMode.value && catId) fetchCategoryAttrs(catId);
}

// ================================
// Эмуляция API для атрибутов (замени на свой API)
async function fetchCategoryAttrs(catId) {
  // categoryAttrs.value = await getCategoryAttrsFromApi(catId); // заменишь на свой API
  // Вот пример мок-атрибутов:
  categoryAttrs.value = [
    { name: "Размер", type: "string" },
    { name: "Цвет", type: "string" },
  ];
  // Если вариантов нет — создаём один вариант для заполнения:
  if (!form.value.variants.length) {
    addVariant();
  }
  syncVariantsWithAttrs();
}

// ================================
// Работа с вариантами и тегами
// ================================
function addVariant() {
  const attrs = {};
  categoryAttrs.value.forEach((attr) => (attrs[attr.name] = ""));
  form.value.variants.push({
    sku: "",
    attributes: attrs,
    price: 0,
    currency: "",
    quantity: 0,
    images: [],
  });
}
function addTag() {
  const value = tagInput.value.trim();
  if (value && !form.value.tags.includes(value)) form.value.tags.push(value);
  tagInput.value = "";
}
function removeTag(idx) {
  form.value.tags.splice(idx, 1);
}
function handleImages(event) {
  const files = Array.from(event.target.files || []);
  form.value.images = files;
}

// ================================
// Сабмит
// ================================
function onSubmit() {
  emit("submit", { ...form.value });
}
</script>
