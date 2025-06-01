<template>
  <!-- Оверлей для мобилы -->
  <transition name="fade">
    <div
      v-if="isOpen && isMobile"
      class="fixed inset-0 bg-black/30 z-40"
      @click="close"
    />
  </transition>

  <!-- Sidebar -->
  <transition name="slide">
    <aside
      v-if="isOpen || !isMobile"
      :class="[
        'bg-white shadow-xl h-screen w-64 fixed top-0 left-0 z-50 flex flex-col px-4 py-6 transition-transform duration-300',
        isOpen || !isMobile ? 'translate-x-0' : '-translate-x-full',
      ]"
    >
      <!-- Кнопка закрыть (всегда видна только на мобиле) -->
      <button
        v-if="isMobile"
        class="absolute right-3 top-3 text-2xl text-gray-400 hover:text-blue-600"
        @click="close"
      >
        &times;
      </button>

      <div class="flex items-center mb-10">
        <span class="font-bold text-2xl text-blue-700 tracking-tight">
          <span class="text-blue-700">A</span>minPanel
        </span>
      </div>

      <nav class="flex-1">
        <ul class="space-y-2">
          <li>
            <NuxtLink
              to="/dashboard"
              class="flex items-center px-3 py-2 rounded-xl text-gray-700 hover:bg-blue-100 transition font-medium"
              active-class="bg-blue-50 text-blue-700"
              @click="closeOnMobile"
            >
              <span class="mr-2">
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6"
                  ></path>
                </svg>
              </span>
              Dashboard
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/products"
              class="flex items-center px-3 py-2 rounded-xl text-gray-700 hover:bg-blue-100 transition font-medium"
              active-class="bg-blue-50 text-blue-700"
              @click="closeOnMobile"
            >
              <span class="mr-2">
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M20 13V7a2 2 0 00-2-2H6a2 2 0 00-2 2v6m16 0v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4"
                  ></path>
                </svg>
              </span>
              Продукты
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/categories"
              class="flex items-center px-3 py-2 rounded-xl text-gray-700 hover:bg-blue-100 transition font-medium"
              active-class="bg-blue-50 text-blue-700"
              @click="closeOnMobile"
            >
              <span class="mr-2">
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="3"></circle>
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.82 2.82l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.82-2.82l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09c.66 0 1.25-.38 1.51-1a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.82-2.82l.06.06a1.65 1.65 0 001.82.33h.09c.66 0 1.25.38 1.51 1h.09c.66 0 1.25-.38 1.51-1a1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.82 2.82l-.06.06a1.65 1.65 0 00-.33 1.82v.09c0 .66.38 1.25 1 1.51v.09c0 .66-.38 1.25-1 1.51z"
                  ></path>
                </svg>
              </span>
              Категории
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </aside>
  </transition>

  <!-- Глобальная бургер-кнопка — не показывать когда меню открыто! -->
  <button
    v-if="!isOpen"
    class="fixed top-4 left-4 z-50 bg-white p-2 rounded-xl shadow-md border border-gray-200 transition hover:bg-blue-50"
    @click="open"
  >
    <svg
      class="w-7 h-7 text-blue-700"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  </button>
</template>

<script setup>
import { ref, onMounted } from "vue";

const isOpen = ref(false);
const isMobile = ref(false);

const open = () => (isOpen.value = true);
const close = () => (isOpen.value = false);

// Автоопределение мобильника (можно по ширине 768px)
function handleResize() {
  isMobile.value = window.innerWidth < 768;
  if (!isMobile.value) isOpen.value = true; // на десктопе всегда открыто
  if (isMobile.value) isOpen.value = false; // на мобиле — закрыто
}

onMounted(() => {
  handleResize();
  window.addEventListener("resize", handleResize);
});
function closeOnMobile() {
  if (isMobile.value) close();
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
