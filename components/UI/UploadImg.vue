<template>
  <label
    class="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer w-full h-36 transition hover:border-blue-400"
  >
    <input type="file" class="hidden" @change="handleFile" />
    <div v-if="image.url" class="flex flex-col items-center">
      <img
        :src="
          isValidUrl(image.url)
            ? image.url
            : `data:${imageType};base64,${image.url}`
        "
        alt="banner"
        class="h-24 rounded mb-2 object-contain"
      />
      <span class="text-xs text-gray-500">{{ successImageLable }}</span>
    </div>
    <div v-else class="flex flex-col items-center">
      <svg
        class="w-10 h-10 text-gray-400 mb-2"
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
      <span class="text-sm text-gray-500">{{ label }}</span>
    </div>
  </label>
</template>
<script setup>
import { isValidUrl } from "@/utils/link.js";
const { label, image, imageType, successImageLable } = defineProps({
  label: {
    type: String,
    default: "Add image",
  },
  successImageLable: {
    type: String,
    default: "Change image",
  },
  image: { url: String },
  imageType: String,
});

const emit = defineEmits(["change"]);
const handleFile = (event) => emit("change", event);
</script>
