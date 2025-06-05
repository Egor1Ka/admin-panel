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
          v-for="attribute in attributes"
          :key="attribute._id"
          class="hover:bg-blue-50 transition-colors"
        >
          <td class="py-2 px-4 border-b border-gray-100">
            <input
              type="checkbox"
              class="form-checkbox rounded text-blue-500 focus:ring-0"
            />
          </td>

          <td
            class="py-2 px-4 border-b border-gray-100 font-semibold text-lg text-gray-900"
          >
            <NuxtLink
              :to="`/attributes/edit/${attribute._id}`"
              class="hover:text-black-600 underline transition font-semibold"
            >
              {{ attribute.name }}
            </NuxtLink>
          </td>
          <td class="py-2 px-4 border-b border-gray-100">
            <div class="flex flex-wrap gap-2">
              <span
                class="inline-flex items-center bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-xs font-medium"
              >
                {{ attribute.type }}
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

const { attributes } = defineProps({
  attributes: { type: Array, default: () => [] },
});
</script>

<i18n>
    {
      "ru": {
        "draft": "Черновик",
        "published":"Опубликовано"
      }
    }
  </i18n>
