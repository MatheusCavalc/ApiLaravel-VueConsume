<script setup>
import MainLayout from '@/layouts/MainLayout.vue';
import DeleteProductModal from '@/components/DeleteProductModal.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import Table from '@/components/Table.vue'
import axios from 'axios';
import { ref } from 'vue';

let products = ref('')
let loadingPage = ref(true)
let productId = ref('')
let modalDeleteProduct = ref(false)
let products_empty = ref('')

const getProducts = (url = 'http://localhost/api/products?page=1') => {
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
  <MainLayout currentPath="/">
    <div class="home">

      <template v-if="loadingPage">
        <LoadingSpinner />
      </template>

      <template v-else class="screen">
        <p class="text-very-dark mb-4 font-bold text-3xl lg:text-4xl ml-4 mt-12">
          Products
        </p>

        <template v-if="products_empty">
          <p class="text-very-dark mb-4 font-bold text-2xl lg:text-2xl ml-8 mt-10">
            No Products
          </p>
        </template>

        <Table v-else :products="products" @change-page="getProducts" />
      </template>

      <DeleteProductModal :modalActive="modalDeleteProduct" :product_id="productId"
        @close-modal="toggleModalDeleteProduct" @reload-page="getProducts" />
    </div>
  </MainLayout>
</template>
