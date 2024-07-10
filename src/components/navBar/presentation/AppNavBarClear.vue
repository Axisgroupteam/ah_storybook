<template>
  <div
    class="flex justify-start w-full h-[64px] bg-white top-0 z-10 fixed dark:bg-neutral-800 border-b-[1px] border-neutral-200 dark:border-neutral-700 dark:text-white"
  >
    <div class="flex gap-[22px] items-center py-4 pl-5">
      <ContainerButton class="p-2" @click="handleBack">
        <ArrowIcon class="w-5" fill="currentColor" />
      </ContainerButton>
      <FlowBiteIcons :icon="!dark ? 'hub_icon_small' : 'hub_dark_small'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ContainerButton from "@/new_design/components/ui/buttons/ContainerButton.vue";
import ArrowIcon from "@/assets/flowbite_icons/arrow-left.svg";
import router from "@/router";
import { useAuthStore } from "@/components/presentation/Auth/domain/auth";
import { storeToRefs } from "pinia";
import FlowBiteIcons from "@/new_design/auth/components/ui/icons/FlowBiteIcons.vue";

const authStore = useAuthStore();
const { dark } = storeToRefs(authStore);

const handleBack = () => {
  router.back();
};
</script>

<style scoped></style>
