<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { defineProps } from 'vue';
import { logout } from '@/services/functions'

const props = defineProps(['currentPath'])

let authUser = localStorage.getItem("bearerToken") === null ? false : true

const exit = () => {
  logout()
}

const navigation = [
  {
    name: 'Products',
    href: '/',
    current: props.currentPath === '/' ? true : false
  },
  {
    name: 'New Product',
    href: '/new-product',
    current: props.currentPath === '/new-product' ? true : false
  }
]

</script>

<template>
  <Disclosure as="nav" class="bg-gray-800 fixed w-full z-10 top-0" v-slot="{ open }">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <DisclosureButton
            class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex flex-shrink-0 items-center">
            <img class="block h-8 w-auto lg:hidden" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
              alt="Your Company" />
            <img class="hidden h-8 w-auto lg:block" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
              alt="Your Company" />
          </div>
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <router-link v-for="item in navigation" :key="item.name" as="a" :to="item.href"
                :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'px-3 py-2 rounded-md text-sm font-medium']"
                :aria-current="item.current ? 'page' : undefined">
                {{ item.name }}
              </router-link>
            </div>
          </div>
        </div>
        <template v-if="authUser">
          <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button type="button" class="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white">
              <span class="sr-only">View notifications</span>
              <BellIcon class="h-6 w-6" aria-hidden="true" />
            </button>

            <!-- Profile dropdown -->
            <Menu as="div" class="relative ml-3">
              <div>
                <MenuButton class="flex rounded-full bg-gray-800 text-sm">
                  <span class="sr-only">Open user menu</span>
                  <img class="h-8 w-8 rounded-full" src="https://avatars.githubusercontent.com/u/105112560?v=4"
                    alt="sexmaster" />
                </MenuButton>
              </div>
              <transition enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95">
                <MenuItems
                  class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                  <MenuItem v-slot="{ active }">
                  <a @click="exit" href=""
                    :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Sign out</a>
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </template>

        <template v-else>
          <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <router-link to="/register" class="rounded-full bg-gray-800 mr-3 p-1 text-gray-400 hover:text-white">
              Register
            </router-link>
            <router-link to="/login" class="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white">
              Login
            </router-link>
          </div>
        </template>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="space-y-1 px-2 pt-2 pb-3">
        <router-link v-for="item in navigation" :key="item.name" as="a" :to="item.href"
          :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block px-3 py-2 rounded-md text-base font-medium']"
          :aria-current="item.current ? 'page' : undefined">{{ item.name }}</router-link>
      </div>
    </DisclosurePanel>
  </Disclosure>

  <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-8">
    <div class="bg-white overflow-hidden sm:rounded-lg mt-6">
      <slot />
    </div>
  </div>
</template>
