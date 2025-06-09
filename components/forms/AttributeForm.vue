<template>
  <form @submit.prevent="submit(form)" class="space-y-6">
    <AdminInput
      v-model.trim="form.name"
      placeholder="Введите название"
      label="Название"
      required
    />

    <!-- Code -->

    <AdminInput
      v-model.trim="form.code"
      placeholder="Введите код"
      label="Код"
      required
    />

    <AdminSelect
      v-model="form.type"
      :options="atributeTypes"
      default-value="select"
      label="Тип"
      required
    />

    <!-- Values -->
    <div>
      <label class="block text-gray-700 font-semibold mb-2"> Значения </label>
      <div
        class="flex flex-wrap gap-2 border border-gray-300 rounded-lg p-2 min-h-[44px] bg-gray-50"
      >
        <span
          v-for="(value, i) in form.values"
          :key="i"
          class="bg-blue-100 text-blue-700 px-2 py-1 rounded flex items-center"
        >
          {{ value.value }}
          <button
            type="button"
            class="ml-1 text-blue-500 hover:text-red-500 transition cursor-pointer"
            @click="removeValue(i)"
            title="Удалить"
          >
            ×
          </button>
        </span>
        <input
          v-model.trim="valuesInput"
          @keydown.enter.prevent="addValue"
          @keydown.space.prevent="addValue"
          @keydown.,.prevent="addValue"
          placeholder="Добавить новое значение"
          class="border-none outline-none flex-1 min-w-[80px] bg-transparent"
        />
      </div>
    </div>

    <!-- Submit -->
    <button
      type="submit"
      class="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl mt-2 shadow hover:bg-blue-700 transition cursor-pointer"
    >
      {{ submitButtonText }}
    </button>
  </form>
</template>

<script setup>
import AdminInput from "@/components/UI/AdminInput.vue";
import AdminSelect from "../UI/AdminSelect.vue";

const atributeTypes = [
  {
    value: "select",
    label: "select",
  },
];

const {
  attribute,
  values: propsvalues,
  submitButtonText,
} = defineProps({
  attribute: {
    type: Object,
    default: () => ({}),
  },
  values: {
    type: Array,
    default: () => [],
  },
  submitButtonText: String,
});

const emit = defineEmits(["submit"]);

const form = ref({
  name: "",
  code: "",
  type: "select",
  values: [],
});
const valuesInput = ref("");

watch(
  () => attribute,
  (newVal) => {
    if (!newVal) {
      form.value = { name: "", code: "", type: "select", values: [] };
    } else {
      form.value = {
        _id: newVal._id,
        name: newVal.name,
        code: newVal.code,
        type: newVal.type,
        values: [...propsvalues],
      };
    }
  },
  { immediate: true }
);

const addValue = () => {
  const value = valuesInput.value;

  if (value && !form.value.values.some((value) => value.value === value)) {
    form.value.values.push({
      value,
      attribute: form.value._id,
    });
  }

  valuesInput.value = "";
};

const removeValue = (idx) => {
  form.value.values.splice(idx, 1);
};

function submit(form) {
  emit("submit", form);
}
</script>
