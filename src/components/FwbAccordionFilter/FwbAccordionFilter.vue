<template>
    <div class="accordion">
      <div 
        v-for="(category, index) in categories" 
        :key="index" 
        class="accordion-item"
        >
        <div @click="toggle(index)" :class="['accordion-header', {'bg-neutral-100 dark:bg-neutral-700' : activeIndex === index} ]">
          {{ category }}          
          <svg
            v-if="activeIndex === index"
                    data-accordion-icon
                    class="h-6 rotate-180"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                />
         </svg>
         <svg
          v-else
                data-accordion-icon
                class="h-6 "
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
            >
        <path
          fill-rule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        />
        </svg>
        </div>
        <div v-if="activeIndex === index" class="accordion-content line-clamp-4 overflow-hidden text-ellipsis">
        <slot  :name="`content-${index}`"></slot>
      </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue';
  
  const emit = defineEmits(['eventChangeOption']);
  const props = defineProps<{
    categories: string[];
  }>();
  
  const activeIndex = ref<number>(0); // Primera categoría abierta por defecto
  const selectedItems = ref<string[]>([]);
  
  const toggle = (index: number) => {
    activeIndex.value = activeIndex.value === index ? -1 : index;    
    emit('eventChangeOption', index);
    console.log(`output->emitevent`)
  };
  
  // Watcher para mostrar los items seleccionados
  watch(selectedItems, (newItems) => {
    console.log('Selected items:', newItems);
  });
  </script>
  
  <style scoped>
  .accordion {
    @apply w-full;   
  }
  .accordion-item {
    /*border-bottom: 1px solid #ccc;*/
  }
  .accordion-header {
    @apply flex justify-between align-middle gap-3 text-neutral-900 dark:text-white font-semibold text-xs md:text-sm cursor-pointer py-3 px-4 border-b hover:bg-neutral-100 dark:hover:bg-neutral-700;
  }
  .accordion-icon {
    margin-left: 10px;
    
  }
  
  .accordion-content {
    @apply my-2 mt-3 text-neutral-500 dark:text-white font-medium text-xs md:text-sm;  
     
    
  }
  .accordion-content ul {
    list-style: none;
    padding: 0;
  }
  .accordion-content li {
    @apply py-[6px]
  }
  </style>
  