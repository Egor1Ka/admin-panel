<template>
  <form @submit.prevent="submit" class="max-w-6xl mx-auto p-8">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Левая основная колонка -->
      <div
        class="md:col-span-2 bg-white rounded-2xl shadow p-8 flex flex-col gap-6"
      >
        <h2 class="text-2xl font-bold mb-4 text-gray-900">Основное</h2>

        <div>
          <label class="block mb-1 font-medium text-gray-700">Категория</label>
          <CategorySelect
            v-model="form.categoryId"
            :categories="categories"
            @change="fetchCategoryAttrs"
          />
        </div>

        <div>
          <label class="block mb-1 font-medium text-gray-700">Название</label>
          <input
            v-model="form.name"
            placeholder="Введите название"
            class="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-200 placeholder-gray-400"
            required
          />
        </div>

        <div>
          <label class="block mb-1 font-medium text-gray-700">Описание</label>
          <textarea
            v-model="form.description"
            placeholder="Опишите продукт"
            class="border border-gray-300 rounded-lg px-3 py-2 w-full min-h-[60px] focus:border-blue-500 focus:ring-2 focus:ring-blue-200 placeholder-gray-400"
          />
        </div>

        <div>
          <label class="block mb-1 font-medium text-gray-700">Теги</label>
          <div
            class="flex flex-wrap items-center gap-2 border border-gray-300 rounded-lg p-2 min-h-[44px] bg-gray-50"
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
              @keydown.space.prevent="addTag"
              @keydown.,.prevent="addTag"
              placeholder="Новый тег"
              class="border-none outline-none flex-1 min-w-[80px] bg-transparent"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label class="block mb-1 font-medium text-gray-700"
              >Цена (по умолчанию)</label
            >
            <input
              type="number"
              v-model.number="form.defaultPrice"
              class="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label class="block mb-1 font-medium text-gray-700">Валюта</label>
            <select
              v-model="form.currency"
              class="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            >
              <option
                v-for="currency in currencies"
                :key="currency.code"
                :value="currency.id"
              >
                {{ currency.code }}
              </option>
            </select>
          </div>
          <div>
            <label class="block mb-1 font-medium text-gray-700"
              >Количество</label
            >
            <input
              type="number"
              v-model.number="form.quantity"
              class="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              required
            />
          </div>
        </div>
      </div>

      <!-- Правая колонка -->
      <div class="flex flex-col gap-6">
        <!-- Фото продукта -->
        <div class="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
          <span class="text-lg font-semibold mb-2 text-gray-900"
            >Фото продукта</span
          >
          <MultiUploadImage v-model="form.images" label="Загрузить" />
        </div>
        <!-- Статус -->
        <div class="bg-white rounded-2xl shadow p-6">
          <label class="block mb-1 font-medium text-gray-700">Статус</label>
          <select
            v-model="form.status"
            class="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >
            <option value="draft">Черновик</option>
            <option value="published">Опубликовано</option>
            <option value="archived">Архив</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Варианты товара -->
    <div class="pt-8"></div>

    <ProducyVariantsBlock
      v-if="form.variants.length"
      v-model:variants="form.variants"
      v-model:categoryAttrs="categoryAttrs"
      @add-variant="addVariant"
      :currencies="currencies"
    />
    <div class="pt-8"></div>
    <button
      class="w-full mt-10 bg-blue-600 text-white py-4 rounded-xl text-lg font-semibold shadow hover:bg-blue-700 transition cursor-pointer"
      :disabled="loading"
    >
      {{ loading ? "Сохраняем..." : "Создать продукт" }}
    </button>

    <div v-if="error" class="text-red-500 text-center mt-2">{{ error }}</div>
  </form>
</template>

<script setup>
import CategorySelect from "@/components/CategorySelect";
import MultiUploadImage from "@/components/UI/MultiUploadImage";
import ProducyVariantsBlock from "@/components/forms/blocks/ProducyVariantsBlock.vue";
import { ref } from "vue";
import { createProduct } from "@/utils/api/server/product";
import { getCategoryById } from "@/utils/api/server/category";
import { useRouter } from "vue-router";
const router = useRouter();

const { categories } = defineProps({
  categories: {
    type: Array,
    default: () => [],
  },
  currencies: {
    type: Array,
    default: () => [],
  },
});

const categoryAttrs = ref([]);
const loading = ref(false);
const error = ref("");
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
const tagInput = ref("");

const fetchCategoryAttrs = async () => {
  categoryAttrs.value = [];
  form.value.attributes = {};
  form.value.variants = [];
  if (!form.value.categoryId) return;
  const cat = await getCategoryById(form.value.categoryId);
  categoryAttrs.value = cat?.data?.attributes || [];
  // инициализация атрибутов для товара
  categoryAttrs.value.forEach((attr) => {
    form.value.attributes[attr.name] = "";
  });
  // автоматом добавим один вариант после выбора категории
  addVariant();
};

const addVariant = () => {
  const attrObj = {};
  categoryAttrs.value.forEach((attr) => (attrObj[attr.name] = ""));
  form.value.variants.push({
    sku: "",
    attributes: { ...attrObj },
    price: 0,
    currency: "",
    quantity: 0,
    images: [],
  });
};

// TAGS-INPUT methods
const addTag = () => {
  const value = tagInput.value.trim();
  if (value && !form.value.tags.includes(value)) {
    form.value.tags.push(value);
  }
  tagInput.value = "";
};

const removeTag = (idx) => {
  form.value.tags.splice(idx, 1);
};

const submit = async () => {
  loading.value = true;
  error.value = "";

  try {
    // ...отправка продукта
    await createProduct({ ...form.value });
    // редиректим:
    router.push("/products"); // или на детали, если вернулся id: `/products/${createdProduct._id}`
  } catch (e) {
    error.value = e.message || "Ошибка";
  } finally {
    loading.value = false;
  }
};
</script>
