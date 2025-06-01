<template>
  <div class="overflow-x-auto">
    <table class="min-w-full bg-white border border-gray-200 rounded-lg shadow">
      <thead>
        <tr class="bg-gray-50 text-gray-800 uppercase text-xs font-bold">
          <th class="py-3 px-4 border-b border-gray-200 text-left"></th>
          <th class="py-3 px-4 border-b border-gray-200 text-left">
            THUMBNAIL
          </th>
          <th class="py-3 px-4 border-b border-gray-200 text-left">NAME</th>
          <th class="py-3 px-4 border-b border-gray-200 text-left">
            DESCRIPTION
          </th>
          <th class="py-3 px-4 border-b border-gray-200 text-left">SKU</th>
          <th class="py-3 px-4 border-b border-gray-200 text-left">PRICE</th>
          <th class="py-3 px-4 border-b border-gray-200 text-left">
            <span class="text-green-500">QUANTITY</span> +
            <span class="text-red-500">VARIANTS</span>
          </th>
          <th class="py-3 px-4 border-b border-gray-200 text-center">STATUS</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="product in products"
          :key="product._id"
          class="hover:bg-blue-50 transition-colors"
        >
          <td class="py-2 px-4 border-b border-gray-100">
            <input
              type="checkbox"
              class="form-checkbox rounded text-blue-500 focus:ring-0"
            />
          </td>
          <td class="py-2 px-4 border-b border-gray-100">
            <div
              class="flex items-center justify-center h-16 w-16 bg-gray-100 rounded border border-gray-200 overflow-hidden"
            >
              <img
                v-if="getProductImg(product)"
                :src="getProductImg(product)"
                class="object-contain h-full w-full"
              />
              <span v-else class="text-gray-400 text-sm">No Img</span>
            </div>
          </td>
          <td
            class="py-2 px-4 border-b border-gray-100 font-semibold text-lg text-gray-900"
          >
            <a
              :href="`/products/edit/${product._id}`"
              class="hover:text-black-600 underline transition font-semibold"
              >{{ product.name }}</a
            >
          </td>
          <td class="py-2 px-4 border-b border-gray-100 text-gray-700">
            {{ product.description }}
          </td>
          <!-- Варианты: SKU, цена, stock. Если несколько, объединяем через запятую -->
          <td class="py-2 px-4 border-b border-gray-100">
            <div v-if="product.variants && product.variants.length">
              <span
                v-for="(variant, i) in product.variants"
                :key="i"
                class="block"
              >
                {{ variant.sku }}
              </span>
            </div>
          </td>
          <td class="py-2 px-4 border-b border-gray-100">
            <div v-if="product.defaultPrice">
              <span class="block">
                {{
                  `${Number(product.defaultPrice).toFixed(0)} ${
                    product.currency.code
                  }`
                }}
              </span>
            </div>
          </td>
          <td class="py-2 px-4 border-b border-gray-100">
            <div v-if="product.quantity">
              <span class="text-color-green-500">
                {{ product.quantity }}
              </span>
              <span
                v-if="product.variants && product.variants.length"
                class="text-red-500"
              >
                +({{ getVariantsQuantity(product.variants) }})
              </span>
            </div>
          </td>
          <td class="py-2 px-4 border-b border-gray-100 text-center">
            <div class="flex items-center justify-center gap-2">
              <span
                :class="[
                  'inline-block w-4 h-4 rounded-full',
                  product.status === 'published'
                    ? 'bg-green-400/80 shadow'
                    : product.status === 'draft'
                    ? 'bg-gray-300'
                    : 'bg-red-300',
                ]"
                :title="product.status"
              ></span>
              <span class="text-sm font-medium text-gray-700">
                {{ t(product.status) }}
              </span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const props = defineProps({
  products: {
    type: Array,
    default: () => [],
  },
});

// Получаем первую картинку первого варианта (можно доработать)
function getProductImg(product) {
  const images = product.images;
  if (!images) return "";
  // Если images — массив строк (base64 или url)
  const imgObj = images?.[0];

  if (!imgObj) return "";

  if (typeof imgObj === "object" && imgObj.image && imgObj.imageType) {
    return `data:${imgObj.imageType};base64,${imgObj.image}`;
  }
  if (typeof imgObj === "string") {
    return imgObj.startsWith("data:") ? imgObj : "";
  }
  return "";
}

const getVariantsQuantity = (variants) => {
  let quantity = 0;
  variants.forEach((variant) => {
    quantity += variant.quantity;
  });
  return quantity;
};
</script>

<i18n>
  {
    "ru": {
      "draft": "Черновик",
      "published": "Опубликовано",
      "archived": "Архив"
    }
  }
  </i18n>
