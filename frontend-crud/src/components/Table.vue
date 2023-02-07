<script setup>

</script>

<template>

    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <slot name="headColumns" />
                </tr>

            </thead>
            <tbody>

                <slot name="tableRows" />

            </tbody>
        </table>
    </div>

</template>
