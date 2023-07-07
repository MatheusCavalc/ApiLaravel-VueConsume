<script setup>
import { ref } from "vue";
import setAuthHeader from "@/services/setAuthHeader";
import axios from "axios";

const isButtonDisabled = ref(false)
const errors = ref('')

let email = ''
let password = ''

const submit = () => {
    isButtonDisabled.value = true
    event.preventDefault()
    axios.post('http://localhost/api/auth/login', {
        email: email.trim(),
        password: password.trim()
    }).then((response) => {
        localStorage.setItem('bearerToken', response.data.data.token)
        setAuthHeader(response.data.data.token)
        window.location.replace('/');
    }).catch(error => {
        if (error.response.data.message == 'Invalid Credentials') {
            errors.value = error.response.data.message
            isButtonDisabled.value = false
        }
    });
}
</script>

<template>
    <section>
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto my-4 lg:py-0">
            <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900">
                <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo">
                Flowbite
            </a>
            <div
                class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Sign in to your account
                    </h1>
                    <form class="space-y-4 md:space-y-6" v-on:submit="submit">
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                                email</label>
                            <input type="email" v-model="email" id="email"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="name@company.com" required="">
                            <div v-if="errors">
                                <p class="text-sm text-red-500">{{ errors }}</p>
                            </div>
                        </div>
                        <div>
                            <label for="password"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="password" v-model="password" id="password" placeholder="••••••••"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required="">
                            <div v-if="errors">
                                <p class="text-sm text-red-500">{{ errors }}</p>
                            </div>
                        </div>
                        <button type="submit" :disabled="isButtonDisabled"
                            :class="[isButtonDisabled ?
                                'opacity-50 w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' :
                                'w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800']">Sign
                            in</button>
                        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                            Don’t have an account yet? <router-link to="/register"
                                class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign
                                up</router-link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>