<template>
  <label class="block mb-1 font-medium text-gray-700">{{ label }}</label>
  <select
    :value="modelValue"
    @change="onChange"
    class="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
  >
    <option v-if="defaultValue" :value="''" disabled>
      {{ defaultValue }}
    </option>
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.label }}
    </option>
  </select>
</template>

<script setup>
const props = defineProps({
  modelValue: [String, Number],
  options: {
    type: Array,
    default: () => [],
  },
  label: {
    type: String,
    default: "",
  },
  defaultValue: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

function onChange(e) {
  emit("update:modelValue", e.target.value);
}
</script>
