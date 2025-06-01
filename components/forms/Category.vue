<template>
  <form
    @submit.prevent="handleSubmit"
    class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6"
  >
    <!-- Левая часть -->
    <div class="md:col-span-2 space-y-6">
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-lg font-semibold mb-4">{{ t("general") }}</h2>
        <div class="mb-4">
          <label class="block font-medium mb-1">{{ t("category_name") }}</label>
          <input
            v-model.trim="form.name"
            class="border rounded w-full p-2"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block font-medium mb-1">{{ t("slug") }}</label>
          <input
            v-model.trim="form.slug"
            class="border rounded w-full p-2"
            required
          />
        </div>
        <div class="mb-4">
          <CategorySelect
            v-model="form.parentId"
            :categories="categories"
            :defaultValue="t('select_category')"
            :label="t('parent_category')"
            :required="false"
          />
        </div>
        <div class="mb-4">
          <label class="block font-medium mb-1">{{ t("description") }}</label>
          <textarea
            v-model.trim="form.description"
            class="border rounded w-full p-2"
            rows="3"
          />
        </div>
      </div>
      <div class="bg-white rounded-lg shadow p-6 mb-6">
        <h2 class="text-lg font-semibold mb-4">Атрибуты категории</h2>
        <AttributeCategory v-model="form.attributes" />
      </div>
    </div>
    <!-- Правая часть -->
    <div class="space-y-6">
      <div class="bg-white rounded-lg shadow p-6 flex flex-col items-center">
        <h2 class="text-lg font-semibold mb-4">{{ t("category_banner") }}</h2>
        <UploadImg
          :image="form.image"
          :imageType="form.imageType"
          :label="t('add_image')"
          :successImageLable="t('change_image')"
          @change="handleFile"
        />
      </div>
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-lg font-semibold mb-4">{{ t("status") }}</h2>
        <EntityStatus v-model="form.status" />
      </div>
      <button
        class="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg mt-4 shadow hover:bg-blue-700 transition cursor-pointer"
        :disabled="loading"
      >
        {{ loading ? t("loading") : isEdit ? t("save") : t("create") }}
      </button>
      <div v-if="error" class="text-red-500 text-center">{{ error }}</div>
    </div>
  </form>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { useI18n } from "vue-i18n";
import CategorySelect from "@/components/CategorySelect";
import AttributeCategory from "@/components/AttributeCategory";
import UploadImg from "@/components/UI/UploadImg";
import EntityStatus from "@/components/EntityStatus";

// Универсальные пропсы:
const emit = defineEmits(["submit", "success"]);
const { t } = useI18n();
const props = defineProps({
  category: { type: Object, default: null }, // если есть — режим edit
  categories: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
  error: { type: String, default: "" },
});

// Местный стейт для формы
const form = ref({
  name: "",
  slug: "",
  description: "",
  metaTitle: "",
  metaKeywords: "",
  parentId: "",
  image: "",
  imageType: "",
  status: "draft",
  attributes: [],
});

// Смотрим, edit или create
const isEdit = computed(() => !!props.category && !!props.category._id);

// При изменении пропса category — заполняем форму
watch(
  () => props.category,
  (cat) => {
    if (!cat) {
      // Новый объект (создание)
      form.value = {
        name: "",
        slug: "",
        description: "",
        metaTitle: "",
        metaKeywords: "",
        parentId: "",
        image: "",
        imageType: "",
        status: "draft",
        attributes: [],
      };
    } else {
      // Редактирование — заполняем из объекта
      form.value = {
        name: cat.name || "",
        slug: cat.slug || "",
        description: cat.description || "",
        metaTitle: cat.metaTitle || "",
        metaKeywords: cat.metaKeywords || "",
        parentId: cat.parentId || "",
        image: cat.image || "",
        imageType: cat.imageType || "",
        status: cat.status || "draft",
        attributes: Array.isArray(cat.attributes) ? [...cat.attributes] : [],
      };
    }
  },
  { immediate: true }
);

// Универсальный обработчик загрузки файла
const handleFile = (event) => {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    form.value.image = reader.result.split(",")[1];
    form.value.imageType = file.type;
  };
  reader.readAsDataURL(file);
};

// Универсальный submit
const handleSubmit = () => {
  emit("submit", {
    ...form.value,
    _id: props.category?._id || undefined, // если есть
  });
};
</script>

<script>
// Если у тебя отдельный helper для Buffer → base64
</script>

<i18n>
  {
    "ru": {
      "save": "Сохранить",
      "create_category": "Создать категорию",
      "general": "Основное",
      "category_name": "Название категории",
      "parent_category": "Родительская категория",
      "select_category": "Выбрать категорию",
      "description": "Описание",
      "seo": "SEO",
      "slug": "Slug",
      "meta_title": "Мета-заголовок",
      "meta_keywords": "Мета-ключевые слова",
      "category_banner": "Баннер категории",
      "add_image": "Добавить изображение",
      "change_image": "Сменить изображение",
      "image": "Изображение",
      "status": "Статус",
      "draft": "Черновик",
      "published": "Опубликовано",
      "archived": "Архив",
      "show_in_menu": "Показывать в меню магазина",
      "show_products": "Показывать товары?",
      "create": "Создать",
      "loading": "Загрузка...",
      "attribute_type_color":"Цвет",
      "attribute_type_number":"Число",
      "attribute_type_string":"Текст"
    }
  }
  </i18n>
