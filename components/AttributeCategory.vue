<template>
  <div v-for="(attr, idx) in attributes" :key="idx" class="flex gap-2 mb-2">
    <input
      v-model.trim="attr.name"
      placeholder="Название"
      class="border rounded p-2 flex-1"
    />
    <select v-model="attr.type" class="border rounded p-2 w-32">
      <option
        v-for="attributeType in attributeTypes"
        :value="attributeType.type"
        :key="attributeType.type"
      >
        {{ t(`attribute_type_${attributeType.type}`) }}
      </option>
    </select>
    <button
      type="button"
      @click="removeAttribute(idx)"
      class="px-2 py-1 bg-red-500 text-white rounded"
      v-if="attributes.length > 1"
    >
      –
    </button>
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
});

const emit = defineEmits(["update:modelValue"]);

const attributes = ref([...props.modelValue]);

watch(attributes, (val) => emit("update:modelValue", val), { deep: true });

function addAttribute() {
  attributes.value.push({ name: "", type: "string" });
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
