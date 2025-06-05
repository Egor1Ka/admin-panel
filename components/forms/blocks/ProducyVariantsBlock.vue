<template>
  <div
    v-for="(variant, idx) in localVariants"
    :key="idx"
    class="mb-4 relative rounded-2xl border border-gray-200 bg-white shadow-sm px-6 pt-6 pb-5"
  >
    <button
      type="button"
      class="absolute top-4 right-4 text-gray-400 hover:text-red-500 p-1 transition rounded-full cursor-pointer"
      @click="removeVariant(idx)"
      title="Удалить вариант"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
    <div>
      <div>
        <label class="block mb-1 font-medium text-gray-700">SKU</label>
        <input
          v-model="variant.sku"
          class="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-blue-500"
          required
          placeholder="Введите SKU"
        />
      </div>

      <div class="flex gap-4 mb-4 mt-4">
        <div class="flex-1">
          <label class="block mb-1 font-medium text-gray-700">Количество</label>
          <input
            type="number"
            v-model="variant.quantity"
            class="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-blue-500"
            required
            placeholder="0"
          />
        </div>

        <div class="flex-1">
          <label class="block mb-1 font-medium text-gray-700">Цена</label>
          <input
            type="number"
            v-model="variant.price"
            class="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-blue-500"
            required
            placeholder="0"
          />
        </div>
        <div class="flex-1">
          <label class="block mb-1 font-medium text-gray-700">Валюта</label>
          <select
            v-model="variant.currency"
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
      </div>
    </div>

    <div class="mb-4">
      <MultiUploadImage v-model="variant.images" label="Картинки варианта" />
    </div>

    <!-- Динамические атрибуты -->
    <div class="">
      <div
        v-for="(attr, index) in localCategoryAttrs"
        :key="attr.name"
        class="mb-2"
      >
        <label class="block mb-1 font-medium text-gray-700">{{
          attr.name
        }}</label>
        <select
          v-if="attr.type === 'select'"
          v-model="variant.attributes[index].value"
          class="border rounded p-2"
        >
          <option :value="''" disabled>Выберите {{ attr.name }}</option>
          <option v-for="val in attr.values" :value="val.id" :key="val.id">
            {{ val.value }}
          </option>
        </select>
      </div>
    </div>
  </div>

  <button
    type="button"
    class="px-5 mb-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow transition cursor-pointer"
    @click="emit('add-variant')"
  >
    + Вариант
  </button>
</template>

<script setup>
import MultiUploadImage from "@/components/UI/MultiUploadImage";

const { variants, categoryAttrs, currencies } = defineProps({
  variants: Array,
  categoryAttrs: Object,
  currencies: Array,
  categoryId: String | Object,
});

const localVariants = computed({
  get: () => variants,
  set: (val) => emit("update:variants", val),
});

const localCategoryAttrs = computed({
  get: () => categoryAttrs.attributes,
  set: (val) => emit("update:categoryAttrs", val),
});

const removeVariant = (idx) => {
  localVariants.value.splice(idx, 1);
};

const emit = defineEmits([
  "update:variants",
  "update:categoryAttrs",
  "add-variant",
]);
</script>
