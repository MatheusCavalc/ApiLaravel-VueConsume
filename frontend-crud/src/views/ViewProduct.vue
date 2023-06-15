<script setup>
import MainLayout from '@/layouts/MainLayout.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import { useRoute } from 'vue-router';
import axios from "axios";
import { ref } from "vue";

const route = useRoute()

let url = process.env.VUE_APP_API_URL_BASE
let id = route.params.id
let loadingPage = ref(true)
const product = ref([])
const error404 = ref(false)

const getProduct = () => {
    axios.get(url + '/' + id).then((response) => {
        product.value = response.data.data
        console.log(response)
        loadingPage.value = false
    }).catch((error) => {
        if(error.message = "Request failed with status code 404") {
            loadingPage.value = false
            error404.value = true
        }
    })
}

getProduct()
</script>

<template>
    <MainLayout>
        <template v-if="loadingPage ">
            <LoadingSpinner />
        </template>

        <template v-if="error404">
          <p class="text-very-dark mb-4 font-bold text-2xl lg:text-2xl ml-8 mt-24">
            Product Not Found
          </p>
        </template>

        <template v-if="!loadingPage && !error404">
            <div class="max-w-7xl mx-auto px-4 py-2 sm:px-6 lg:px-8 mt-8">
                <div
                    class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {{ product.name }}
                    </h5>
                    <p class="font-normal text-gray-700 dark:text-gray-400">Category: {{ product.category }}</p>

                    <p class="font-normal text-gray-700 dark:text-gray-400 mt-3">Quantity: {{ product.quantity }}</p>

                    <div class="flex justify-between mt-3">
                        <p class="font-normal text-gray-700 dark:text-gray-400">Buy Price: {{ product.buy_price }}</p>

                        <p class="font-normal text-gray-700 dark:text-gray-400">Sale Price: {{ product.sale_price }}</p>
                    </div>
                </div>
            </div>
        </template>
    </MainLayout>
</template>