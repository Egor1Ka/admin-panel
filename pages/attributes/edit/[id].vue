<template>
  <AttributeForm
    :attribute="attributeData"
    :values="valuesData"
    submitButtonText="Сохранить"
    @submit="submit"
  />
  <!-- <AttributeForm /> -->
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import {
  getAttributeById,
  getAttributeValuesById,
} from "@/utils/api/server/attributes";
import {
  createManyValues,
  deleteManyValues,
} from "@/utils/api/server/attributesValue";
import AttributeForm from "@/components/forms/AttributeForm.vue";

const route = useRoute();
const router = useRouter();
const id = route.params.id;

const { data: attributeData } = await useAsyncData("attribute", () =>
  getAttributeById(id).then((res) => res.data)
);

const { data: values } = await useAsyncData("categories", () =>
  getAttributeValuesById(id).then((res) => res.data)
);

const getNewValues = (value) => !value._id;

function getIdsToDelete(values, formValues) {
  const formIds = new Set(formValues.filter((v) => v._id).map((v) => v._id));
  return values.filter((v) => !formIds.has(v._id)).map((v) => v._id);
}

const successRedirect = () => router.push("/attributes");

const submit = async (form) => {
  const newValues = form.values.filter(getNewValues);
  const idsToDelete = getIdsToDelete(values.value, form.values);

  if (newValues.length) await createManyValues({ values: newValues });
  if (idsToDelete.length) await deleteManyValues({ values: idsToDelete });

  successRedirect();
};

const valuesData = values.value;
</script>
