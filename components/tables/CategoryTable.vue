<template>
  <div class="overflow-x-auto">
    <table class="min-w-full bg-white border border-gray-200 rounded-lg shadow">
      <thead>
        <tr class="bg-gray-50 text-gray-800 uppercase text-xs font-bold">
          <th class="py-3 px-4 border-b border-gray-200 text-left"></th>
          <th class="py-3 px-4 border-b border-gray-200 text-left">
            THUMBNAIL
          </th>
          <th class="py-3 px-4 border-b border-gray-200 text-left">NAME</th>
          <th class="py-3 px-4 border-b border-gray-200 text-left">
            DESCRIPTION
          </th>
          <th class="py-3 px-4 border-b border-gray-200 text-left">
            ATTRIBUTES
          </th>
          <th class="py-3 px-4 border-b border-gray-200 text-center">STATUS</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="category in categories"
          :key="category._id"
          class="hover:bg-blue-50 transition-colors"
        >
          <td class="py-2 px-4 border-b border-gray-100">
            <input
              type="checkbox"
              class="form-checkbox rounded text-blue-500 focus:ring-0"
            />
          </td>
          <td class="py-2 px-4 border-b border-gray-100">
            <div
              class="flex items-center justify-center h-16 w-16 bg-gray-100 rounded border border-gray-200 overflow-hidden"
            >
              <img
                v-if="getCategoryImg(category)"
                :src="getCategoryImg(category)"
                class="object-contain h-full w-full"
              />
              <span v-else class="text-gray-400 text-sm">No Img</span>
            </div>
          </td>
          <td
            class="py-2 px-4 border-b border-gray-100 font-semibold text-lg text-gray-900"
          >
            <NuxtLink
              :to="`/categories/edit/${category._id}`"
              class="hover:text-black-600 underline transition font-semibold"
            >
              {{ category.name }}
            </NuxtLink>
          </td>
          <td class="py-2 px-4 border-b border-gray-100 text-gray-700">
            {{ category.description }}
          </td>
          <td class="py-2 px-4 border-b border-gray-100">
            <div class="flex flex-wrap gap-2">
              <span
                v-for="(attr, i) in category.attributes"
                :key="i"
                class="inline-flex items-center bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-xs font-medium"
              >
                {{ attr.name }}
                <span class="ml-1 text-gray-400 font-normal"
                  >({{ attr.type }})</span
                >
              </span>
            </div>
          </td>
          <td class="py-2 px-4 border-b border-gray-100 text-center">
            <div class="flex items-center justify-center gap-2">
              <span
                :class="[
                  'inline-block w-4 h-4 rounded-full',
                  category.status === 'published'
                    ? 'bg-green-400/80 shadow'
                    : category.status === 'draft'
                    ? 'bg-gray-300'
                    : 'bg-red-300',
                ]"
                :title="category.status"
              ></span>
              <span class="text-sm font-medium text-gray-700">
                {{ t(category.status) }}
              </span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps({
  categories: {
    type: Array,
    default: () => [],
  },
});

function getCategoryImg(category) {
  if (!category.image || !category.imageType) return "";
  if (typeof category.image === "string") {
    return `data:${category.imageType};base64,${category.image}`;
  }
  if (category.image?.data && category.imageType) {
    const uint8Array = new Uint8Array(category.image.data);
    const binaryString = uint8Array.reduce(
      (acc, byte) => acc + String.fromCharCode(byte),
      ""
    );
    const base64 = btoa(binaryString);
    return `data:${category.imageType};base64,${base64}`;
  }
  return "";
}
</script>

<i18n>
  {
    "ru": {
      "draft": "Черновик",
      "published":"Опубликовано"
    }
  }
</i18n>
