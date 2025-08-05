<template>
  <div class="overflow-x-auto">
    <table class="min-w-full bg-white border border-gray-200 rounded-lg shadow">
      <thead>
        <tr class="bg-gray-50 text-gray-800 uppercase text-xs font-bold">
          <th class="py-3 px-4 border-b border-gray-200 text-left">Заказ</th>
          <th class="py-3 px-4 border-b border-gray-200 text-left">Товары</th>
          <th class="py-3 px-4 border-b border-gray-200 text-left">Сумма</th>
          <th class="py-3 px-4 border-b border-gray-200 text-left">Валюта</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(order, idx) in orders"
          :key="order.id || idx"
          class="hover:bg-blue-50 transition-colors"
        >
          <td class="py-2 px-4 border-b border-gray-100 text-gray-700">
            {{ order.id }}
          </td>
          <td class="py-2 px-4 border-b border-gray-100 text-gray-700">
            {{ order.items.map((item) => item.title).join(", ") }}
          </td>
          <td
            class="py-2 px-4 border-b border-gray-100 font-semibold text-gray-900"
          >
            {{ order.total.toFixed(2) }}
          </td>
          <td class="py-2 px-4 border-b border-gray-100 text-gray-700">
            <span
              class="inline-flex items-center bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-xs font-medium"
            >
              {{ order.items[0]?.currency.symbol }}
              {{ order.items[0]?.currency.code }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const props = defineProps({
  orders: {
    type: Array,
    default: () => [],
  },
});
</script>
