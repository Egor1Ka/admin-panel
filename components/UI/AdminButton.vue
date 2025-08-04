<template>
  <button
    :class="classes"
    :disabled="props.disabled"
    @click="emit('click', $event)"
  >
    <slot name="text"> </slot>
    <svg
      v-if="props.disabled"
      class="ml-2 h-5 w-5 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  </button>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  disabled: { type: Boolean, default: false },
});
const emit = defineEmits(["click"]);

const classes = computed(() => [
  "w-full font-semibold py-3 rounded-xl mt-4 transition cursor-pointer flex items-center justify-center",
  props.disabled
    ? "bg-gray-400 cursor-not-allowed shadow-none"
    : "bg-blue-600 text-white shadow hover:bg-blue-700",
]);
</script>
