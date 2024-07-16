<template>
	<div>
		<FwbDropdown v-if="!stacked" :placement="placement" :type="type" :max_h="max_h">
			<template #trigger>
				<ContainerButton :disabled="disabled">
					<template #default>
						<FwbAvatar :rounded="rounded" :size="size" :img="(img) ? img : ''" :initials="(initials) ? initials : ''" />
					</template>
				</ContainerButton>
			</template>
			<ul><!-- Menu List -->
				<li
					class="cursor-auto overflow-hidden w-[200px] py-[8px] items-start flex border-b border-b-neutral-200 dark:border-b-neutral-600 last:border-b-0 first:rounded-t-lg justify-start last:rounded-b-lg text-neutral-500 dark:text-neutral-400 font-medium">
					<ul class="-space-y-[2px]">
						<li
							class="px-4 overflow-hidden w-[200px] items-start flex justify-start text-neutral-500 r:text-white dark:text-neutral-400">
							<span class="text-ellipsis truncate whitespace-nowrap text-sm font-semibold">{{ fullName }}</span>
						</li>
						<li
							class="px-4 overflow-hidden w-[200px] items-start flex justify-start text-neutral-500 r:text-white dark:text-neutral-400">
							<span class="text-ellipsis truncate whitespace-nowrap text-sm font-normal">{{ email }}</span>
						</li>
					</ul>
				</li>
				<li v-for="(option, index) in options" :key="index" class="px-4 overflow-hidden w-[200px] py-4 items-center flex gap-2 
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
						dark:last:hover:text-red-500">
					<component fill="currentColor" :is="getFBIcon(option.icon)" />
					<span class="cursor-pointer text-ellipsis truncate whitespace-nowrap">{{ option.label }}</span>
				</li>
			</ul>
		</FwbDropdown>
		<FwbAvatarStack v-else-if="stacked">
			<FwbAvatar v-for="(stack, index) in maxInStack" 
				:key="index" 
				:img="imgStacks[index]" 
				:size="size"
				:bordered="bordered"
				:rounded="rounded" :stacked="stacked" />
			<FwbAvatarStackCounter :size="size" href="#" :total="totalStacked" />
		</FwbAvatarStack>

	</div>
</template>

<script setup lang="ts">
	import { computed, defineProps, ref } from 'vue';
	import { type AvatarSize } from "./types";
	import { getFBIcon } from './getAsset';
	import ContainerButton from './ContainerButton.vue';
	import FwbAvatar from "./FwbAvatar.vue";
	import FwbAvatarStack from "./FwbAvatarStack.vue";
	import FwbAvatarStackCounter from './FwbAvatarStackCounter.vue';
	import FwbDropdown from './FwbDropdown.vue';

	const props = withDefaults(
		defineProps<{
			type?: 'primary' | 'secondary'
			bordered?: boolean
			disabled?: boolean
			size?: AvatarSize
			rounded?: boolean
			placement?: string
			img?: string
			stacked?: boolean
			totalStacked?: number
			maxInStack?: number
			imgStacks?: Array<string>
			options?: Array<{
				label: string
				icon: string
				link: string
			}>
			fullName?: string
			email?: string
			max_h?: string,
		}>(),{
			size: 'sm',
			type: 'primary',
			bordered: false,
			placement: 'left',
			rounded: true,
			initials: '',
			img: '',
			stacked: false,
			totalStacked: 0,
			maxInStack: 0,
			imgStacks: () => [],
			options: () => [{ label: 'Profile', icon: 'user', link: 'profile' }, { label: 'Logout', icon: 'arrow-right-to-bracket', link: 'logout' }],
			fullName: '',
			email: '',
			max_h: "max-h-[160px]",
		}
	);

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
	
	const fullName = computed(() => props.fullName)
	const email = computed(() => props.email)
	const initials = computed(() => getInitials(props.fullName))
	const disabled = computed(() => props.disabled)
	const size = computed(() => props.size)
	const placement = computed(() => props.placement)


</script>
