<script setup>
import MainLayout from '@/layouts/MainLayout.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import Table from '@/components/Table.vue'
import axios from 'axios';
import { onMounted, ref } from 'vue';

let products = ref('')
let search = ref('')
let loadingPage = ref(true)
let products_empty = ref('')

const getProducts = (url = 'http://localhost/api/products?page=1') => {
  axios.get(url)
    .then((response) => {
      products.value = response.data
      loadingPage.value = false
      products.value.data.length == 0 ? products_empty.value = true : products_empty.value = false
    })
}

const getProductsSearch = () => {
  if (search.value != '') {
    axios.get('http://localhost/api/products/livesearch/' + search.value)
      .then((response) => {
        products.value = response.data
        loadingPage.value = false
        products.value.data.length == 0 ? products_empty.value = true : products_empty.value = false
      })
  } else {
    getProducts()
  }

}

onMounted(() => {
  getProducts()
});
</script>

<template>
  <MainLayout currentPath="/">
    <div class="home">

      <template v-if="loadingPage">
        <LoadingSpinner />
      </template>

      <template v-else>
        <div class="flex justify-between">
          <p class="text-very-dark mb-4 font-bold text-xl lg:text-4xl ml-4 mt-12">
            Products
          </p>

          <input type="search" id="default-search" v-model="search" @keyup="getProductsSearch"
            class="block mr-2 lg:mr-0 mt-12 h-4 lg:h-11 p-4 lg:pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
            placeholder="Search Products">
        </div>

        <template v-if="products_empty">
          <p class="text-very-dark mb-4 font-bold text-2xl lg:text-2xl ml-8 mt-10">
            No Products
          </p>
        </template>

        <Table v-else :products="products" @change-page="getProducts" @reload-products="getProducts" />
      </template>
    </div>
  </MainLayout>
</template>
