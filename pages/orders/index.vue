<template>
  <OrdersTable :orders="normalizedOrders" />
</template>

<script setup>
import { computed } from "vue";
import OrdersTable from "@/components/tables/OrdersTable.vue";
import { getOrders } from "@/utils/api/server/order.js";

// 1. Получаем «сырой» массив заказов из API
const { data: ordersDataRef } = await useAsyncData("orders", () =>
  getOrders().then((res) => res.data)
);

const normalizeItems = (items = []) =>
  items.map((item) => {
    const price = item.variantId?.price ?? item.product?.defaultPrice ?? 0;
    const quantity = item.quantity ?? 0;
    const sum = +(price * quantity).toFixed(2);

    return {
      variantId: item.variantId?._id,
      title: item.variantId?.sku || item.product?.name || "—",
      quantity,
      price,
      sum,
      currency: {
        symbol: item.currency?.symbol,
        code: item.currency?.code,
      },
    };
  });

const normalizeOrder = (order) => {
  const items = normalizeItems(order.items);
  const calcSubtotal = items.reduce((acc, i) => acc + i.sum, 0);

  return {
    id: order._id,
    items,
    fields: order.fields,
    subtotal: +calcSubtotal.toFixed(2),
    shippingCost: order.shippingCost,
    discount: order.discount,
    total: +(
      calcSubtotal +
      (order.shippingCost ?? 0) -
      (order.discount ?? 0)
    ).toFixed(2),
    status: order.status,
    paymentMethod: order.paymentMethod,
    paymentStatus: order.paymentStatus,
    createdAt: order.createdAt,
  };
};

const normalizedOrders = computed(() => {
  const list = ordersDataRef.value || [];
  return list.map(normalizeOrder);
});

console.log("normalizedOrders", normalizedOrders);
</script>
