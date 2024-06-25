<template>
    <div
      id="notification"
      class="flex justify-between items-center p-4  m-0 gap-2  max-w-full rounded-md w-[400px]  bg-white dark:bg-[#262626]"
    >
      <div class="flex gap-2 justify-center items-center">
        
        <div :class="bg_icon_class"> 
          <component :is="getFBIcon(status)" />
        </div>
        <span
          class="text-[14px] leading-[24px] text-[#737373] dark:text-[#A3A3A3]"
          >{{ content }}</span
        >
      </div>
      <div class="flex cursor-pointer">
        <component :is="getFBIcon('close')" />
      </div>
    </div>
  </template>
  <script setup lang="ts">
    import { getFBIcon } from "../../utils/getAssets";
    import { ref} from "vue";
  
    interface IProps {
      status: 'success'| 'warning' | 'error';
      content: string;
    }
  
    const props = withDefaults(defineProps<IProps>(), {
      status: "error",
      content: "Change password failed!",
    });
  
    const bg_icon_classes = {
        success: 'bg-green-200  dark:bg-green-400 rounded-lg w-8',
        warning: 'bg-yellow-200 dark:bg-yellow-400 rounded-lg w-8',
        error: 'bg-red-200 dark:bg-red-400 rounded-lg w-8',
   
    }
  
    const bg_icon_class = ref((bg_icon_classes[props.status]))
</script>
  