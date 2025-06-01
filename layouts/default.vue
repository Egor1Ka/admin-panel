<template>
  <div class="flex min-h-screen bg-gray-50">
    <Sidebar ref="sidebarRef" />
    <!-- Подстраиваем отступ под ширину меню ТОЛЬКО если оно открыто на десктопе -->
    <div
      :class="[
        'transition-all flex-1 p-4 md:p-8',
        sidebarOpen ? 'md:ml-64' : '',
      ]"
    >
      <NuxtPage />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Sidebar from "@/components/UI/Sidebar.vue";

const sidebarRef = ref();
const sidebarOpen = ref(true);

onMounted(() => {
  // Слушаем изменения состояния из сайдбара (можно через provide/inject/emit, или проще через ref)
  setInterval(() => {
    sidebarOpen.value =
      sidebarRef.value?.isOpen !== undefined ? sidebarRef.value.isOpen : true;
  }, 200);
});
</script>
