<template>
  <Calendar />
  <div v-if="false" ref="target" class="relative flex w-full rounded-lg">
    <div class="flex flex-col gap-1 w-full">
      <input
        ref="target"
        v-model="inputVal"
        type="text"
        readonly
        class="bg-transparent border-2 border-solid border-rose-700 px-10 py-2 rounded h-14 text-[16px] text-stone-900 leading-none font-normal tracking-wide outline-none cursor-pointer"
        @click="showCalendar = !showCalendar"
      />
      <label
        class="text-rose-700 leading-none font-normal tracking-wide absolute bg-[#FFF8F7] transition-all duration-100 ease-linear"
        :class="valueIsEmpty ? '-top-1.5 left-4 text-[12px]' : '-top-1.5 left-4 text-[12px]'"
      >
        {{ label }}
      </label>
      <span class="text-[12px] leading-none tracking-wide text-stone-700 px-4">
        {{ supText }}
      </span>
      <!--<component
            :is="getAssetComponent('search_24px')"
class="absolute left-[10px] top-4 text-[11px]"
    />
    <component
            :is="getAssetComponent('calendar')" :class="'absolute right-[10px] top-4 text-[11px] h-6 w-6 fill-[#524342]'"
    />
    --></div>
    <div
      id="dropdown"
      class="z-[999] absolute bg-stone-50 rounded-lg border top-full w-full h-fit"
      :class="showCalendar ? 'flex' : 'hidden'"
    >
      <Calendar @change="dateChange" @close="handleClose" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
//import { getAssetComponent } from '@/utils/getSvg';
import { useCalendarStore } from './calendar'
import Calendar from './Calendar.vue'
import { onClickOutside } from '@vueuse/core'

const calendarStore = useCalendarStore()

interface Props {
  label: string
  supText: string
}

const props = defineProps<Props>()

const inputVal = ref('')
const valueIsEmpty = computed(() => inputVal.value.length === 0)
const showCalendar = ref(false)

const dateChange = (date: string) => {
  inputVal.value = date
  showCalendar.value = false
}

const handleClose = () => {
  showCalendar.value = false
}

const target = ref(null)

//onClickOutside(target, (event) => (showCalendar.value = false));
</script>

<style scoped>
input:invalid {
  background-color: red;
}
</style>
