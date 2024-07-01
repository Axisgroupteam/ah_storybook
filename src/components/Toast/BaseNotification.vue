<template>
  <div
    id="notification"
    v-if="status === 'action'"
    class="flex justify-between relative items-center p-4 m-0 gap-2 min-h-[155px] w-full rounded-md bg-white dark:bg-[#262626]"
  >
    <div class="absolute top-4 flex flex-col justify-start pb-4 pr-4">
      <div :class="bg_icon_class">
        <component :is="getFBIcon(status)" />
      </div>
    </div>
    <div class="grow pl-12 flex flex-col justify-start">
      <div class="flex justify-between">
        <span class="font-bold text-[14px] dark:text-white text-neutral-900 leading-[24px]">{{
          actionTitle
        }}</span>
        <div class="flex">
          <FwbButton square color="secondary" class="border-0">
            <template #default>
              <component :is="getFBIcon('close')" />
            </template>
          </FwbButton>
        </div>
      </div>
      <p class="text-[14px] leading-[24px] text-neutral-600 dark:text-[#A3A3A3]">{{ content }}</p>

      <div class="flex justify-between pt-4">
        <FwbButton color="primary" size="md">
          <template #default>
            <span class="px-8">Accept</span>
          </template>
        </FwbButton>
        <FwbButton color="secondary" size="md">
          <template #default>
            <span class="px-8">Decline</span>
          </template>
        </FwbButton>
      </div>
    </div>
  </div>
  <div
    v-else
    id="notification"
    class="flex justify-between items-center p-4 m-0 gap-2 w-full rounded-md bg-white dark:bg-[#262626]"
  >
    <div class="flex gap-2 justify-center items-center">
      <div :class="bg_icon_class">
        <component :is="getFBIcon(status)" />
      </div>
      <span class="text-[14px] leading-[24px] text-neutral-500 dark:text-[#A3A3A3]">{{
        content
      }}</span>
    </div>
    <div class="flex cursor-pointer">
      <FwbButton square color="secondary" class="border-0">
        <template #default>
          <component :is="getFBIcon('close')" />
        </template>
      </FwbButton>
    </div>
  </div>
</template>
<script setup lang="ts">
import { getFBIcon } from '../../utils/getAssets'
import FwbButton from '../FwbButton/FwbButton.vue'
import { computed } from 'vue'

interface IProps {
  status: 'success' | 'warning' | 'error' | 'action' | 'info'
  content: string
  actionTitle?: string
}

const props = withDefaults(defineProps<IProps>(), {
  status: 'error',
  content: 'Change password failed!',
  actionTitle: 'Action Notification'
})

const bg_icon_classes = {
  success: 'bg-green-100  dark:bg-green-700 rounded-lg text-green-700 dark:text-green-400',
  warning: 'bg-orange-100 dark:bg-orange-700 rounded-lg text-orange-700 dark:text-orange-400',
  error: 'bg-red-100 dark:bg-red-700 rounded-lg text-red-700 dark:text-red-400',
  action: 'bg-red-100 dark:bg-red-700 rounded-lg text-red-700 dark:text-red-400',
  info: 'bg-blue-100 dark:bg-blue-700 rounded-lg text-blue-700 dark:text-blue-400 '
}

const bg_icon_class = computed(() => bg_icon_classes[props.status])
</script>
