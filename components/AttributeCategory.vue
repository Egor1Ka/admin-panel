<template>
  <div class="flex flex-col">
    <select v-model="attributes" class="w-full">
      <option
        v-for="attr in props.attributes"
        :key="attr._id"
        :value="attr._id"
      >
        {{ attr.name }}
      </option>
    </select>
  </div>
  <button
    type="button"
    class="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
    @click="addAttribute"
  >
    + Добавить атрибут
  </button>
</template>

<script setup>
import { attributeTypes } from "@/utils/constants/attribute";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  attributes: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["update:modelValue"]);

const attributes = ref([...props.modelValue]);

watch(attributes, (val) => emit("update:modelValue", val), { deep: true });

function addAttribute() {
  attributes.value.push();
}

function removeAttribute(idx) {
  if (attributes.value.length > 1) attributes.value.splice(idx, 1);
}
</script>

<i18n>
{
    "ru": {
        "attribute_type_color":"Цвет",
        "attribute_type_number":"Число",
        "attribute_type_string":"Текст",
    }
}
</i18n>
