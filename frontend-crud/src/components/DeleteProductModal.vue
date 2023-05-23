<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import { deleteData } from '@/services/functions'

const props = defineProps(['modalActive', 'product_id'])
const emit = defineEmits(['closeModal', 'reloadPage'])

let isButtonDisabled = ref(false)
const closeModal = () => {
    emit('closeModal')
}
const destroyProduct = () => {
    isButtonDisabled.value = true
    deleteData(props.product_id)
    emit('closeModal')
    emit('reloadPage')
    isButtonDisabled.value = false
}
</script>

<template>
    <div class="fixed overflow-x-hidden overflow-y-auto inset-0 flex justify-center items-center z-50"
        v-show="props.modalActive">
        <div class="relative lg:mx-auto lg:w-2/5 w-4/5">
            <div class="bg-white w-full rounded-md pt-8 pb-10 pl-9 pr-8">
                <div class="flex justify-between">
                    <p class="text-2xl font-bold tracking-tight"></p>

                    <button class="" @click="closeModal">X</button>
                </div>

                <div class="mt-6">
                    <p class="text-2xl text-center font-bold tracking-tight">Delete Product?</p>

                    <p class="mt-2 text-center">Deletion is not reversible, and the product will be completely deleted.</p>
                </div>

                <div class="flex flex-row-reverse mt-10">
                    <template v-if="!isButtonDisabled">
                        <button :disabled="isButtonDisabled" @click="destroyProduct()"
                            class="ml-5 px-7 py-2 text-base tracking-tighter text-white bg-blue-600 rounded-full">
                            Delete
                        </button>
                        <button @click="closeModal"
                            class="px-7 py-2 text-base tracking-tighter text-blue-600 bg-white border border-blue-600 rounded-full">
                            Cancel
                        </button>
                    </template>

                    <template v-else>
                        <button disabled type="button"
                            class="px-7 py-2 text-base tracking-tighter text-white bg-blue-400 rounded-full">
                            <svg aria-hidden="true" role="status" class="inline w-4 h-4 mx-1 text-white animate-spin"
                                viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="#E5E7EB" />
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentColor" />
                            </svg>
                            Saving...
                        </button>
                    </template>
                </div>
            </div>
        </div>
    </div>

    <div v-show="props.modalActive" class="absolute z-40 inset-0 opacity-25 bg-black"></div>
</template>