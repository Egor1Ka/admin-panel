<template>
  <form
    @submit.prevent="handleSubmit"
    class="mx-auto grid grid-cols-1 md:grid-cols-3 gap-6"
  >
    <div class="md:col-span-2 space-y-6">
      <div class="bg-white rounded-2xl shadow p-6">
        <h2 class="text-xl font-bold mb-4">{{ t("general") }}</h2>
        <AdminInput
          class="mb-4"
          v-model.trim="form.name"
          :label="t('category_name')"
          required
          placeholder="Введите название"
        />

        <AdminInput
          class="mb-4"
          v-model.trim="form.slug"
          :label="t('slug')"
          required
          placeholder="Введите slug"
        />

        <div class="mb-4">
          <CategorySelect
            v-model="form.parentId"
            :categories="categories"
            :defaultValue="t('select_category')"
            :label="t('parent_category')"
            :required="false"
          />
        </div>

        <AdminTextarea
          class="mb-4"
          v-model.trim="form.description"
          :label="t('description')"
          :rows="3"
          placeholder="Описание"
        />
      </div>

      <div class="bg-white rounded-2xl shadow p-6 mb-6">
        <h2 class="text-xl font-bold mb-4">Атрибуты категории</h2>
        <div
          v-for="(attrId, idx) in form.attributes"
          :key="idx"
          class="flex items-center gap-2 mb-2"
        >
          <AdminSelect
            v-model="form.attributes[idx]"
            :options="availableAttributes(idx)"
            default-value="Выберите атрибут"
          />
          <button
            type="button"
            @click="removeAttribute(idx)"
            class="text-red-500 ml-2 hover:text-red-700 transition cursor-pointer"
            title="Удалить"
          >
            ✕
          </button>
        </div>

        <button
          type="button"
          class="mt-2 px-3 py-1 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition cursor-pointer"
          @click="addAttribute"
        >
          + Добавить атрибут
        </button>
      </div>
    </div>

    <!-- Правая часть -->
    <div class="space-y-6">
      <div class="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
        <h2 class="text-xl font-bold mb-4">{{ t("category_banner") }}</h2>
        <UploadImg
          :image="form.image"
          :imageType="form.imageType"
          :label="t('add_image')"
          :successImageLable="t('change_image')"
          @change="handleFile"
        />
      </div>
      <div class="bg-white rounded-2xl shadow p-6">
        <h2 class="text-xl font-bold mb-4">{{ t("status") }}</h2>
        <EntityStatus v-model="form.status" />
      </div>
      <button
        class="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl mt-4 shadow hover:bg-blue-700 transition cursor-pointer"
      >
        {{ isEdit ? t("save") : t("create") }}
      </button>
      <!-- <div v-if="error" class="text-red-500 text-center">{{ error }}</div> -->
    </div>
  </form>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { useI18n } from "vue-i18n";
import CategorySelect from "@/components/CategorySelect";
import UploadImg from "@/components/UI/UploadImg";
import EntityStatus from "@/components/EntityStatus";
import AdminTextarea from "@/components/UI/AdminTextarea.vue";
import AdminInput from "@/components/UI/AdminInput.vue";
import AdminSelect from "../UI/AdminSelect.vue";

// Универсальные пропсы:
const emit = defineEmits(["submit", "success"]);
const { t } = useI18n();
const props = defineProps({
  category: { type: Object, default: null }, // если есть — режим edit
  categories: { type: Array, default: () => [] },
  attributes: { type: Array, default: () => [] },
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
        attributes: Array.isArray(cat.attributes)
          ? cat.attributes.map(getAttributesId)
          : [],
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

const addAttribute = () => {
  form.value.attributes.push("");
};
const removeAttribute = (idx) => {
  form.value.attributes.splice(idx, 1);
};

const availableAttributes = (idx) => {
  // id-шники, выбранные в других select'ах
  const selectedExceptCurrent = form.value.attributes.filter(
    (_, i) => i !== idx
  );

  const attributesFilter = (attr) =>
    !selectedExceptCurrent.includes(attr._id) ||
    attr._id === form.value.attributes[idx];

  const normalizeAttributes = (attr) => ({
    value: attr._id,
    label: attr.name,
  });

  return props.attributes.filter(attributesFilter).map(normalizeAttributes);
};

function getAttributesId(attribut) {
  return typeof attribut === "object" ? attribut._id : attribut;
}
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
