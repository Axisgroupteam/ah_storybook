<template>
  <div
    class="image-preview cursor-pointer transition ease-in-out delay-150 duration-75"
  >
    <img :src="image" class="image" />
    <button class="delete-button"  @click.stop="removeImage">
      <component
        :is="getFBIcon(icon)"
        v-if="icon"
        class="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-125 duration-75"
      />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { getFBIcon } from "@/utils/getAssets";
import { defineProps, ref, watch } from "vue";

const emit = defineEmits(["remove"]);

interface Props {
  image: string;
  closeable: boolean;
  icon: string;
}

const props = defineProps<Props>();

const removeImage = () => {
  emit("remove");
};
</script>

<style scoped>
.image-preview {
  position: relative;
}
.image {
  width: 140px;
  height: 140px;
  border-radius: 8px;
}
.delete-button {
  position: absolute;
  bottom: 0;
  left: 20px;
  bottom: 20px;
  transform: translateX(-50%);
  color: white;
  border: none;
  cursor: pointer;
}
</style>
