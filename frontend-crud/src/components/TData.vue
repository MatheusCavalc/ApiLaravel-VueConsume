<script setup>
import { computed } from "vue";
const props = defineProps(['type']);
const classes = computed(() => {
    if (props.type === "first") {
        return "px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
    }
    if (props.type === "normal") {
        return "px-6 py-4"
    }
})
</script>

<template>

    <td scope="col" :class="classes">
        <slot />
    </td>
</template>
