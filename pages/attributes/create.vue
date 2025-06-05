<template>
  <AttributeForm submit-button-text="Создать" @submit="submit" />
</template>
<script setup>
import AttributeForm from "@/components/forms/AttributeForm.vue";
import { useRouter } from "vue-router";
import { createAttribute } from "@/utils/api/server/attributes";
import { createManyValues } from "@/utils/api/server/attributesValue";

const router = useRouter();

const successRedirect = () => router.push("/attributes");

const normalizeValuesRequest = (value) => (newAttributeId) => ({
  ...value,
  attribute: newAttributeId,
});

const submit = async (form) => {
  const { values, ...attributeData } = form;

  const newAttribute = await createAttribute(attributeData);
  const {
    data: { _id },
  } = newAttribute;

  const createValues = values.map((value) =>
    normalizeValuesRequest(value)(_id)
  );

  if (values.length) await createManyValues({ values: createValues });
  successRedirect();
};
</script>
