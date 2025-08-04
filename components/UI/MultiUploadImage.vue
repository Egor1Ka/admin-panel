<template>
  <div>
    <div class="mb-2 font-medium text-gray-700">{{ label }}</div>
    <div
      class="flex items-center gap-3 flex-wrap bg-gray-50 border border-dashed border-gray-300 rounded-lg p-3 min-h-[84px]"
    >
      <!-- Кнопка загрузки -->
      <label
        class="flex flex-col items-center justify-center cursor-pointer w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 transition group bg-white"
        :title="'Добавить картинки'"
      >
        <input type="file" multiple class="hidden" @change="handleFiles" />
        <span class="flex flex-col items-center">
          <svg
            class="w-7 h-7 text-gray-400 group-hover:text-blue-500"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2m-4-4l-4-4-4 4m4-4v12"
            />
          </svg>
          <span class="text-xs text-gray-400 group-hover:text-blue-500 mt-1"
            >Загрузить</span
          >
        </span>
      </label>
      <!-- Превью изображений -->
      <div
        v-for="(img, imgIdx) in localImages"
        :key="imgIdx"
        class="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200 shadow-sm bg-white"
      >
        <img
          :src="
            isValidUrl(img.url) ? img.url : `data:image/jpeg;base64,${img.url}`
          "
          class="w-full h-full object-cover rounded-lg"
          alt="img"
        />
        <button
          type="button"
          class="absolute top-1 right-1 w-6 h-6 flex items-center justify-center bg-white border border-red-400 rounded-full text-red-500 text-base shadow hover:bg-red-100 transition cursor-pointer"
          @click="removeImage(imgIdx)"
          title="Удалить"
          style="z-index: 2"
        >
          ×
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, toRefs } from "vue";
const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  label: String,
});
const emit = defineEmits(["update:modelValue"]);
const localImages = ref([...props.modelValue]);

watch(
  localImages,
  (val) => {
    emit("update:modelValue", [...val]);
  },
  { deep: true }
);

function handleFiles(event) {
  const files = Array.from(event.target.files);
  if (!files.length) return;
  files.forEach((file) => {
    const reader = new FileReader();
    reader.onload = () => {
      localImages.value.push({ url: reader.result.split(",")[1] });
    };
    reader.readAsDataURL(file);
  });
  event.target.value = "";
}

function removeImage(idx) {
  localImages.value.splice(idx, 1);
}
</script>
