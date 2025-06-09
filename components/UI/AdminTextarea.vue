<template>
  <div>
    <label class="block font-medium mb-1 text-gray-700">{{ label }}</label>
    <textarea
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      id="name"
      class="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
      placeholder
      required
      rows
    />
  </div>
</template>

<script setup>
const { modelValue, label, required, placeholder, rows } = defineProps({
  modelValue: String,
  label: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  required: {
    type: Boolean,
    default: false,
  },
  rows: {
    type: Number,
    default: 3,
  },
});
</script>
