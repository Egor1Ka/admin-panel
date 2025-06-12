<template>
  <div class="overflow-x-auto">
    <table class="min-w-full bg-white border border-gray-200 rounded-lg shadow">
      <thead>
        <tr class="bg-gray-50 text-gray-800 uppercase text-xs font-bold">
          <th class="py-3 px-4 border-b border-gray-200 text-left"></th>
          <th class="py-3 px-4 border-b border-gray-200 text-left">NAME</th>
          <th class="py-3 px-4 border-b border-gray-200 text-left">CODE</th>
          <th class="py-3 px-4 border-b border-gray-200 text-left">SYMBOL</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="currency in currencies"
          :key="currency._id"
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
              :to="`/currencies/edit/${currency._id}`"
              class="hover:text-black-600 underline transition font-semibold"
            >
              {{ currency.name }}
            </NuxtLink>
          </td>
          <td class="py-2 px-4 border-b border-gray-100">
            <div class="flex flex-wrap gap-2">
              <span
                class="inline-flex items-center bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-xs font-medium"
              >
                {{ currency.code }}
              </span>
            </div>
          </td>
          <td class="py-2 px-4 border-b border-gray-100">
            <div class="flex flex-wrap gap-2">
              <span
                class="inline-flex items-center bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-xs font-medium"
              >
                {{ currency.symbol }}
              </span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const { currencies } = defineProps({
  currencies: { type: Array, default: () => [] },
});
</script>
