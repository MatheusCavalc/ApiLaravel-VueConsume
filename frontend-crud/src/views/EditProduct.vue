<script setup>
import MainLayout from '@/layouts/MainLayout.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import { putData } from '@/services/functions'
import { useRoute } from 'vue-router';
import axios from "axios";
import { ref } from "vue";

const route = useRoute()

let url = process.env.VUE_APP_API_URL_BASE
let id = route.params.id
let loadingPage = ref(true)
let name = ref('')
let category = ref('')
let quantity = ref('')
let buy_price = ref('')
let sale_price = ref('')

const isButtonDisabled = ref('')
isButtonDisabled.value = false

const getProduct = () => {
    axios.get(url + '/' + id).then((response) => {
        name.value = response.data['name']
        category.value = response.data['category']
        quantity.value = response.data['quantity']
        buy_price.value = response.data['buy_price']
        sale_price.value = response.data['sale_price']
        loadingPage.value = false
    })
}

const submit = () => {
    event.preventDefault()
    if (name === '') {
        alert('Field Name is Required')
    } else if (category === '') {
        alert('Field category is Required')
    } else if (quantity === '') {
        alert('Field quantity is Required')
    } else if (buy_price === '') {
        alert('Field Buy Price is Required')
    } else if (sale_price === '') {
        alert('Field Sale Price is Required')
    } else {
        isButtonDisabled.value = true
        let parameters = {
            name: name.value,
            category: category.value,
            quantity: quantity.value,
            buy_price: buy_price.value,
            sale_price: sale_price.value
        }
        putData(id, parameters)
    }
}

getProduct()
</script>

<template>
    <MainLayout>
        <template v-if="loadingPage">
            <LoadingSpinner />
        </template>

        <template v-else>
            <p class="text-very-dark mb-4 font-bold text-3xl lg:text-4xl ml-4 mt-12">
                Edit Product
            </p>

            <div class="max-w-7xl mx-auto px-4 py-2 sm:px-6 lg:px-8 mt-8">
                <form v-on:submit="submit">
                    <div class="relative z-0 w-full mb-6 group">
                        <input type="text" v-model="name" id="floating_email"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" " required />
                        <label for="floating_email"
                            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Product Name
                        </label>
                    </div>
                    <div class="relative z-0 w-full mb-6 group">
                        <input type="text" v-model="category" id="floating_password"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" " required />
                        <label for="floating_password"
                            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Category
                        </label>
                    </div>
                    <div class="relative z-0 w-full mb-6 group">
                        <input type="text" v-model="quantity" id="floating_repeat_password"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" " required />
                        <label for="floating_repeat_password"
                            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Quantity
                        </label>
                    </div>
                    <div class="grid md:grid-cols-2 md:gap-6">
                        <div class="relative z-0 w-full mb-6 group">
                            <input type="text" v-model="buy_price" id="floating_first_name"
                                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" " required />
                            <label for="floating_first_name"
                                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Buy Price
                            </label>
                        </div>
                        <div class="relative z-0 w-full mb-6 group">
                            <input type="text" v-model="sale_price" id="floating_last_name"
                                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" " required />
                            <label for="floating_last_name"
                                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Sale Price
                            </label>
                        </div>
                    </div>
                    <button type="submit" :disabled="isButtonDisabled"
                        :class="[isButtonDisabled ?
                            'opacity-50 text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-900 dark:hover:bg-blue-800 dark:focus:ring-blue-800' :
                            'text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-900 dark:hover:bg-blue-800 dark:focus:ring-blue-800']">Submit</button>
                </form>
            </div>
        </template>
    </MainLayout>
</template>