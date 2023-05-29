<script setup>
import MainLayout from '@/layouts/MainLayout.vue';
import DeleteProductModal from '@/components/DeleteProductModal.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import THead from '@/components/THead.vue'
import TData from '@/components/TData.vue'
import { PencilIcon, TrashIcon } from '@heroicons/vue/24/outline'
import { ref, onMounted } from 'vue';
import axios from 'axios';

const products = ref([]);
const currentPage = ref(1);
const loading = ref(false);
let modalDeleteProduct = ref(false)
let productId = ref('')
let loadingPage = ref(true)

const loadProducts = async () => {
  try {
    loading.value = true;
    const response = await axios.get('http://localhost/api/products?page=1', {
      params: {
        perPage: 10,
        page: currentPage.value,
      },
    });
    products.value = [...products.value, ...response.data.data];
    loadingPage.value = false

    currentPage.value++;
    loading.value = false;
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  loadProducts();
  window.addEventListener('scroll', () => {
    if (
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight
    ) {
      loadProducts();
    }
  });
});

const toggleModalDeleteProduct = (id) => {
  productId.value = id
  modalDeleteProduct.value = !modalDeleteProduct.value
}
</script>

<template>
  <MainLayout currentPath="/">

    <template v-if="loadingPage">
      <LoadingSpinner />
    </template>

    <template v-else>
      <div class="my-10">
        <p class="text-very-dark mb-4 font-bold text-3xl lg:text-4xl ml-4 mt-20">
          Products
        </p>

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
              <tr v-for="product in products" :key="product.id"
                class="bg-white my-20 border-b dark:bg-gray-900 dark:border-gray-700">
                <TData type="first">
                  {{ product.name }} ///// {{ product.id }}
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
        </div>

        <div v-if="loading">
          <LoadingSpinner />
        </div>

      </div>
    </template>

    <DeleteProductModal :modalActive="modalDeleteProduct" :product_id="productId" @close-modal="toggleModalDeleteProduct"
      @reload-page="loadProducts" />

  </MainLayout>
</template>
  
