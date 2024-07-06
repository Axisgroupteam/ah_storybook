<template>
	<div>
		<FwbDropdown v-if="!stacked" type="primary">
			<template #trigger>
				<button 
					ref="pflButton"
					:class="_class"
					class="block focus:ring-[#E5E5E5] rounded-full text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-neutral-700 dark:focus:ring-[#525252] dark:focus:text-white"
				>
					<FwbAvatar :rounded="rounded" :size="size" :initials="(initials) ? initials : ''" :img="(img) ? img : ''" />
				</button>
			</template>
			<ul><!-- Menu List -->
				<li
					class="cursor-auto overflow-hidden w-[200px] py-[8px] items-start flex border-b border-b-neutral-200 dark:border-b-neutral-600 last:border-b-0 first:rounded-t-lg justify-start last:rounded-b-lg text-neutral-500 dark:text-neutral-400 font-medium">
					<ul class="-space-y-1">
						<li class="px-4 overflow-hidden w-[200px] items-start flex justify-start text-neutral-500 r:text-white dark:text-neutral-400">
							<span class="text-ellipsis truncate whitespace-nowrap text-sm font-semibold">{{ fullName }}</span>
						</li>
						<li class="px-4 overflow-hidden w-[200px] items-start flex justify-start text-neutral-500 r:text-white dark:text-neutral-400">
							<span class="text-ellipsis truncate whitespace-nowrap text-sm font-normal">{{ email }}</span>
						</li>
					</ul>
				</li>
				<li v-for="(option, index) in options" :key="index"
					class="px-4 overflow-hidden w-[200px] py-[15px] items-center flex gap-2 
						border-b border-b-neutral-200 
						dark:border-b-neutral-600 
						last:border-b-0 
						hover:bg-neutral-100 
						hover:dark:bg-neutral-600 cursor-pointer 
						first:rounded-t-lg justify-start 
						last:rounded-b-lg 
						text-neutral-500 
						hover:text-neutral-900 
						dark:hover:text-white 
						dark:text-neutral-400 
						text-sm 
						font-medium 
						last:text-red-500 
						dark:last:text-red-500 
						last:hover:text-red-500 
						dark:last:hover:text-red-500"
					>
					<component fill="currentColor" :is="getFBIcon(option.icon)" />
					<span  class="cursor-pointer text-ellipsis truncate whitespace-nowrap">{{ option.label }}</span>
				</li>
			</ul>
		</FwbDropdown>
		<FwbAvatarStack v-else>
			<FwbAvatar v-for="(stack, index) in maxInStack" :key="index" :img="imgStacks[index]" rounded stacked />
			<FwbAvatarStackCounter href="#" :total="totalStacked" />
		</FwbAvatarStack>

	</div>
</template>

<script setup lang="ts">
  import { computed, defineProps, ref } from 'vue';
	import FwbAvatar from "./FwbAvatar.vue";
	import FwbAvatarStack from "./FwbAvatarStack.vue";
	import FwbAvatarStackCounter from './FwbAvatarStackCounter.vue';
	import FwbDropdown from '../FwbDropdown/FwbDropdown.vue';
	import { type AvatarSize } from "./types";
	import { getFBIcon } from './getAsset';
	import { useDotsActions } from './composables/useDotsActions'
	import { onClickOutside } from '@vueuse/core'

	const props = defineProps<{
		size: AvatarSize
		rounded: true
		initials: string
		img: string
		stacked: boolean
		totalStacked: number
		maxInStack: number
		imgStacks: Array<string>
		options: Array<{ 
			label: string
			icon: string
			link: string
		}>
		fullName: string
		email: string
	}>();

	const pflButton = ref(null)
	const { _active, _class } = useDotsActions()

	onClickOutside(pflButton, (event) => {
  _active.value = false
  _class.value = 'focus:ring-0 focus:bg-neutral-100 dark:focus:bg-transparent'
})

function getInitials(name: string): string {
  const nameParts = name.split(' ')
  if (nameParts.length === 2) {
    const initials = nameParts[0].charAt(0) + nameParts[1].charAt(0)
    return initials.toUpperCase()
  } else {
    const initials = nameParts
      .map((part) => part.charAt(0))
      .join('')
      .slice(0, 2)
    return initials.toUpperCase()
  }
}
const initials = computed(() => getInitials(props.fullName))

</script>
