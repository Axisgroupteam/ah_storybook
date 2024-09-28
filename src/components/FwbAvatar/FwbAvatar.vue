<template>
  <div class="relative">
    <div :class="avatarPlaceholderWrapperClasses">
      <img v-if="img && !imageError" :alt="alt" :class="avatarClasses" :src="image" @error="setImageError" />
      <div v-else-if="!initials && hasPlaceholder" :class="avatarPlaceholderClasses">
        <slot name="placeholder" /> {{ hasPlaceholder }}
      </div>
      <svg v-else-if="!img && !initials" :class="avatarPlaceholderClasses" class=" w-9 h-9 !text-neutral-400" viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg" fill="currentColor">
        <path clip-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
      </svg>
      <div v-else :class="avatarPlaceholderInitialsClasses" class="dark:text-neutral-800 text-sm">
        {{ initials }}
      </div>
    </div>
    <span v-if="status" :class="avatarDotClasses" :data-pos="statusPosition" />
  </div>
</template>

<script lang="ts" setup>
  import { computed, type PropType, ref, toRefs, useSlots } from "vue";
  import type { AvatarSize, AvatarStatus, AvatarStatusPosition } from "./types";
  import { useAvatarClasses } from "./composables/useAvatarClasses";
  import { getImage } from "./getAsset";

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
    bordered: {
      type: Boolean,
      default: false,
    },
    img: {
      type: String,
      default: "",
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String as PropType<AvatarSize>,
      default: "md",
    },
    stacked: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String as PropType<AvatarStatus>,
      default: null,
    },
    statusPosition: {
      type: String as PropType<AvatarStatusPosition>,
      default: "top-right",
    },
    initials: {
      type: String,
      default: null,
    },
  });

  const image = computed((): string => {
    return props.img.startsWith("https") ? props.img : getImage(props.img);
  });


  const {
    avatarClasses,
    avatarDotClasses,
    avatarPlaceholderClasses,
    avatarPlaceholderInitialsClasses,
    avatarPlaceholderWrapperClasses,
  } = useAvatarClasses(toRefs(props));


</script>
