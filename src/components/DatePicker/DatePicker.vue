<template>
  <div>
    <div class="relative max-w-sm">
      <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <svg
          class="w-4 h-4 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"
          />
        </svg>
      </div>
      <input
        id="datepicker-actions"
        datepicker
        datepicker-buttons
        datepicker-autohide
        datepicker-autoselect-today
        type="text"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
        placeholder="Select date"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import 'flowbite'
import 'flowbite/dist/flowbite.css'
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'
onMounted(() => {
  initFlowbite()
})
</script>
<style scoped>
@import 'flowbite/dist/flowbite.css';
</style>

button today-btn text-white bg-blue-700 !bg-primary-700 dark:bg-blue-600 dark:!bg-primary-600
hover:bg-blue-800 hover:!bg-primary-800 dark:hover:bg-blue-700 dark:hover:!bg-primary-700
focus:ring-4 focus:ring-blue-300 focus:!ring-primary-300 font-medium rounded-lg text-sm px-5 py-2
text-center w-1/2
