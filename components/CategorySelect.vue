<template>
  <div>
    <label v-if="label" class="block mb-1">{{ label }}</label>
    <select
      class="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-blue-500"
      v-model="model"
      @change="$emit('change', $event.target.value)"
      :disabled="disabled"
    >
      <option v-if="defaultValue" value="">{{ defaultValue }}</option>
      <option v-for="cat in categories" :key="cat.id" :value="cat.id">
        {{ cat.title }}
      </option>
    </select>
  </div>
</template>
<script setup>
import { computed } from "vue";
const props = defineProps({
  modelValue: String,
  categories: Array,
  label: String,
  defaultValue: String,
  required: Boolean,
  disabled: Boolean,
});
const emit = defineEmits(["update:modelValue", "change"]);
const model = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});
</script>
