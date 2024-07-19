<template>
  <FwbDropdown @toogle="visibleRing=!visibleRing" :alignToEnd="alignToEnd" :placement="placement">
    <template #trigger>
      <FwbButton color="secondary" :class="[{'ring-[4px] ring-neutral-300 dark:ring-neutral-500': visibleRing},
                      {'ring-0': !visibleRing}]" class="p-0 overflow-clip" :pill="pill">
        <div class="relative">
          <div :class="avatarPlaceholderWrapperClasses">
            <img v-if="img && !imageError" :alt="alt" :class="avatarClasses" :src="getImage(img)"
              @error="setImageError" />
            <div v-else-if="!initials && hasPlaceholder" class="dark:!text-neutral-300"
              :class="avatarPlaceholderClasses">
              <slot name="placeholder" />
            </div>
            <svg v-else-if="!img && !initials" :class="avatarPlaceholderClasses" class=" w-9 h-9 !text-neutral-400"
              viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
              <path clip-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
            </svg>
            <div v-else-if="initials" :class="avatarPlaceholderInitialsClasses" class="dark:text-neutral-800 text-sm">
              {{ initials }}
            </div>
          </div>
        </div>
      </FwbButton>
    </template>
    <template v-if="hasDropdown" #default>
      <ul><!-- Menu List -->
				<li v-if="fullName"
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
					<component :is="option.component" :initials="option.initials" :img="option.img"/>
					<span class="cursor-pointer text-ellipsis truncate whitespace-nowrap">{{ option.label }}</span>
				</li>
			</ul>
    </template>
  </FwbDropdown>

</template>

<script lang="ts" setup>
  import { computed, type PropType, ref, toRefs, useSlots } from "vue";
  import type { AvatarSize } from "./types";
  import { useAvatarClasses } from "./composables/useAvatarClasses";
  import { getImage, getFBIcon } from "./getAsset";
  import FwbButton from "../FwbButton/FwbButton.vue"
  import FwbDropdown from '../FwbDropdown/FwbDropdown.vue';


  const imageError = ref(false);

  function setImageError() {
    imageError.value = true;
  }

  const slots = useSlots();
  const hasPlaceholder = computed(() => slots.placeholder);

  const props = defineProps({
    alt: {
      type: String,
      default: "Avatar",
    },
    hasDropdown: {
      type: Boolean,
      default: false,
    },
    bordered: {
      type: Boolean,
      default: false,
    },
    img: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
    rounded: {
      type: Boolean,
      default: true,
    },
    alignToEnd: {
      type: Boolean,
      default: true,
    },
    placement: {
      type: String,
      default: 'bottom',
    },
    size: {
      type: String as PropType<AvatarSize>,
      default: "md",
    },
    initials: {
      type: String,
      default: null,
    },
    pill: {
      type: Boolean,
      default: true,
    },
    fullName: {
      type: String,
      default: "",
    },
    options: Array<{
				label: string
				icon: string
				link: string
        component: any
        initials: string | undefined
        img: string | undefined
			}>
  });

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

  const visibleRing=ref(false)


  const initials = computed(() => getInitials(props.fullName))
  const size = computed(() => props.size)
  const placement = computed(() => props.placement)
  const alignToEnd = computed(() => props.alignToEnd)
  const hasDropdown = computed(() => props.hasDropdown)

  const {
    avatarClasses,
    avatarPlaceholderClasses,
    avatarPlaceholderInitialsClasses,
    avatarPlaceholderWrapperClasses,
  } = useAvatarClasses(toRefs(props));
</script>
