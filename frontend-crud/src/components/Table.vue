<script setup>
import DeleteProductModal from '@/components/DeleteProductModal.vue';
import { defineProps, defineEmits, ref } from 'vue';
import { PencilIcon, TrashIcon } from '@heroicons/vue/24/outline'
import THead from '@/components/THead.vue'
import TData from '@/components/TData.vue'

const props = defineProps(['products'])
const emit = defineEmits(['changePage', 'reloadProducts'])
let modalDeleteProduct = ref(false)
let productId = ref('')

const changePage = (url) => {
    emit('changePage', url)
}

const getProducts = () => {
    emit('reloadProducts')
}

const toggleModalDeleteProduct = (id) => {
  productId.value = id
  modalDeleteProduct.value = !modalDeleteProduct.value
}
</script>

<template>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <THead label="Product Name" />
                    <THead label="Category" />
                    <THead label="Quantity" />
                    <THead label="Buy Price" />
                    <THead label="Sale Price" />
                    <THead label="Action" />
                </tr>
            </thead>

            <tbody>
                <tr v-for="product in products.data" :key="product.id"
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
                        <div class="flex pr-2 sm:static sm:inset-auto sm:pr-0">
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
            </tbody>
        </table>

        <div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div class="flex flex-1 justify-between sm:hidden">
                <a href="#"
                    class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</a>
                <a href="#"
                    class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</a>
            </div>
            <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p class="text-sm text-gray-700">
                        Showing
                        <span class="font-medium">{{ products.from }}</span>
                        to
                        <span class="font-medium">{{ products.to }}</span>
                        of
                        <span class="font-medium">{{ products.total }}</span>
                        results
                    </p>
                </div>
                <div>
                    <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <button @click="changePage(products.prev_page_url)"
                            class="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
                            <span class="sr-only">Previous</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                        </button>
                        <!-- Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" -->
                        <template v-for="(link, index) in products.links" :key="link.label">
                            <button v-if="link.label == index" @click="changePage(link.url)"
                                :class="{ 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600': link.active }"
                                class="relative hidden items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 md:inline-flex">
                                {{ link.label }}
                            </button>
                        </template>

                        <button @click="changePage(products.next_page_url)"
                            class="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
                            <span class="sr-only">Next</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    </div>

    <DeleteProductModal :modalActive="modalDeleteProduct" :product_id="productId"
        @close-modal="toggleModalDeleteProduct" @reload-page="getProducts" />
</template>
