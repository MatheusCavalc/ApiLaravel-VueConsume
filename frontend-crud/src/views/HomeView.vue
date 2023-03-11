<script setup>
import DeleteProductModal from '@/components/DeleteProductModal.vue';
import { PencilIcon, TrashIcon } from '@heroicons/vue/24/outline'
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import Table from '@/components/Table.vue'
import THead from '@/components/THead.vue'
import TData from '@/components/TData.vue'
import axios from 'axios';
import { ref } from 'vue';

let products = ref('')
let loadingPage = ref(true)
let url = process.env.VUE_APP_API_URL_BASE
let productId = ref('')
let modalDeleteProduct = ref(false)
let products_empty = ref('')

const getProducts = () => {
  axios.get(url)
    .then((response) => {
      products.value = response.data
      loadingPage.value = false
      products.value.length == 0 ? products_empty.value = true : products_empty.value = false
    })
}

const toggleModalDeleteProduct = (id) => {
    productId.value = id
    modalDeleteProduct.value = !modalDeleteProduct.value
}

getProducts()
</script>

<template>
  <div class="home">

    <template v-if="loadingPage">
      <LoadingSpinner />
    </template>

    <template v-else>
      <p class="text-very-dark mb-4 font-bold text-3xl lg:text-4xl ml-4 mt-6">
        Products
      </p>

      <template v-if="products_empty">
        <p class="text-very-dark mb-4 font-bold text-2xl lg:text-2xl ml-8 mt-10">
          No Products
        </p>
      </template>

      <Table v-else>
        <template #headColumns>
          <THead label="Product Name" />
          <THead label="Category" />
          <THead label="Quantity" />
          <THead label="Buy Price" />
          <THead label="Sale Price" />
          <THead label="Action" />
        </template>

        <template #tableRows>
          <tr v-for="product in products" :key="product.id"
            class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
            <TData type="first">
              {{ product.name }}
            </TData>
            <TData type="normal">
              {{ product.category }}
            </TData>
            <TData type="normal">
              {{ product.quantity }}
            </TData>
            <TData type="normal">
              {{ product.buy_price }}
            </TData>
            <TData type="normal">
              {{ product.sale_price }}
            </TData>
            <TData type="normal">
              <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <router-link :to="{ path: 'edit-product/' + product.id }"
                  class="font-medium mr-3 text-blue-600 dark:text-blue-500 hover:underline">
                  <PencilIcon class="h-6 w-6" aria-hidden="true" />
                </router-link>
                <button @click="toggleModalDeleteProduct(product.id)"
                  class="font-medium text-red-600 dark:text-red-500 hover:underline">
                  <TrashIcon class="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </TData>
          </tr>
        </template>
      </Table>
    </template>
    <DeleteProductModal :modalActive="modalDeleteProduct" :product_id="productId" @close-modal="toggleModalDeleteProduct"
      @reload-page="getProducts" />
  </div>
</template>
