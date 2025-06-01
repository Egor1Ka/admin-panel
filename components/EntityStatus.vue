<template>
  <label
    class="inline-flex items-center"
    v-if="status"
    v-for="statusValue in statusArray"
    :key="statusValue"
  >
    <input
      type="radio"
      v-model="status"
      :value="statusValue"
      class="form-radio"
    />
    <span class="ml-2">{{ t(`${statusValue}`) }}</span>
  </label>
</template>
<script setup>
import { useI18n } from "vue-i18n";
import { ref, watch } from "vue";
import { status as statusArray } from "@/utils/constants/status";

const { t } = useI18n();
const props = defineProps({
  modelValue: {
    type: String,
    default: "draft",
  },
});

const status = ref(props.modelValue);
const emit = defineEmits(["update:modelValue"]);

const watchStatus = (val) => emit("update:modelValue", val);
watch(status, watchStatus);
</script>

<i18n>
{
    "ru": {
        "draft": "Черновик",
        "published": "Опубликовано",
        "archived": "Архив",
    }
}
</i18n>
