<template>
  <div>
    <label class="block text-gray-700 font-semibold mb-1">
      {{ label }}
    </label>
    <input
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      id="name"
      class="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
      placeholder
      required
    />
  </div>
</template>

<script setup>
const { modelValue, label, required, placeholder } = defineProps({
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
});
</script>
