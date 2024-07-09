<template>
    <aside
      id="drawer-navigation"
      class="fixed top-0  left-0 z-50 w-[250px]   bg-white border-r border-gray-200 dark:bg-neutral-800 dark:border-neutral-700 transition-all"
      :class="
        showDrawer
          ? 'translate-x-0 max-w-[1000px]'
          : '-translate-x-full'
      "
      aria-label="Sidenav"
    >
      <div
        class="pb-5 pt-[7px] h-full dark:bg-neutral-800 gap-3 flex flex-col max-h-screen "

      >
        <div
          class="flex flex-col   px-3  min-w-[36px] pt-[20px] gap-[24px]"
    
        >

        <fwb-tooltip
              v-if="!moduleObject?.length"
              placement="right"
              :active="!showDrawer"
              expanded
              :distance="16"
            > 
              <template #trigger>
                <div  class="   flex justify-between  items-center rounded-lg px-[8px] relative bg-red-100 dark:bg-red-900"
                  :class="[{'w-[224px] py-3': showDrawer}, 
                          { 'w-fit py-4': !showDrawer}]"
                    >
                    
                    <div class="flex gap-3 text-black dark:text-white items-center text-center"
                    
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.9366 0H2.06303C0.924476 0 0 0.924476 0 2.06303V17.9375C0 19.0761 0.924476 20.0005 2.06303 20.0005H17.9366C19.0761 20.0005 19.9996 19.0761 19.9996 17.9375V2.06303C19.9996 0.923516 19.0751 0 17.9366 0ZM9.06716 17.9375C8.71004 17.9375 8.40188 17.8185 8.1446 17.5804C7.88636 17.3423 7.73084 17.0514 7.67804 16.7068L7.49948 15.3974C7.32764 15.3311 7.16541 15.2514 7.01373 15.1593C6.86109 15.0671 6.71229 14.9673 6.56733 14.8617L5.33661 15.3782C5.00638 15.5241 4.67614 15.5366 4.34494 15.4175C4.0147 15.2985 3.75646 15.0873 3.57118 14.783L2.63903 13.1558C2.45375 12.8515 2.40095 12.5279 2.48063 12.1833C2.55935 11.8396 2.73887 11.5545 3.01631 11.3299L4.06846 10.5359C4.05502 10.4438 4.04926 10.3545 4.04926 10.2681V9.73243C4.04926 9.64603 4.05598 9.55771 4.06846 9.46459L3.01631 8.67068C2.73887 8.44604 2.55935 8.16188 2.48063 7.81724C2.40095 7.4726 2.45375 7.14909 2.63903 6.84477L3.57118 5.21757C3.75646 4.91326 4.0147 4.70206 4.34494 4.58302C4.67614 4.46398 5.00638 4.47646 5.33661 4.62238L6.56733 5.1379C6.71325 5.0323 6.86493 4.93246 7.02429 4.8403C7.18269 4.74814 7.34108 4.66846 7.50044 4.60222L7.679 3.29278C7.7318 2.94815 7.88732 2.65727 8.14556 2.41919C8.4038 2.18111 8.711 2.06207 9.06812 2.06207H10.9334C11.2905 2.06207 11.5977 2.18111 11.8559 2.41919C12.1132 2.65727 12.2687 2.94815 12.3215 3.29278L12.5001 4.60222C12.6719 4.66846 12.8342 4.74814 12.9868 4.8403C13.1385 4.93246 13.2873 5.0323 13.4332 5.1379L14.663 4.62238C14.9942 4.47646 15.3244 4.46398 15.6546 4.58302C15.9858 4.70206 16.2441 4.91326 16.4284 5.21757L17.3615 6.84477C17.5468 7.14909 17.5996 7.4726 17.5199 7.81724C17.4402 8.16092 17.2617 8.44604 16.9842 8.67068L15.933 9.46459C15.9455 9.55675 15.9532 9.64603 15.9532 9.73243V10.2681C15.9532 10.3545 15.9398 10.4428 15.9138 10.5359L16.965 11.3299C17.2434 11.5545 17.421 11.8387 17.5007 12.1833C17.5804 12.5279 17.5276 12.8515 17.3423 13.1558L16.39 14.783C16.2047 15.0873 15.9465 15.2985 15.6162 15.4175C15.286 15.5366 14.9548 15.5241 14.6246 15.3782L13.4332 14.8617C13.2873 14.9682 13.1366 15.0671 12.9772 15.1593C12.8188 15.2514 12.6595 15.3311 12.5011 15.3974L12.3225 16.7068C12.2697 17.0514 12.1142 17.3423 11.8569 17.5804C11.5987 17.8185 11.2905 17.9375 10.9343 17.9375H9.06908H9.06716ZM10.0396 12.7785C10.8067 12.7785 11.4614 12.5068 12.0038 11.9644C12.5462 11.422 12.8179 10.7673 12.8179 10.0003C12.8179 9.23228 12.5462 8.57852 12.0038 8.03612C11.4614 7.49372 10.8067 7.22205 10.0396 7.22205C9.25916 7.22205 8.60156 7.49372 8.06492 8.03612C7.5302 8.57852 7.2614 9.23228 7.2614 10.0003C7.2614 10.7673 7.52924 11.422 8.06492 11.9644C8.6006 12.5068 9.25916 12.7785 10.0396 12.7785Z" fill="currentColor"/>
                      </svg>

                    <span
                      v-show="showDrawer"
                      :class="
                        !showDrawer   ? 'text-transparent' : ' text-neutral-900 dark:text-white'
                      "
                      class="text-xl font-medium "
                      >Modue 1</span
                    >
                </div>
              </div>
              </template>
              <template #content>
                <span  class="text-sm font-semibold leading-tight text-neutral-900 dark:text-white whitespace-nowrap">
                  Module 1
                </span>
              </template>
            </fwb-tooltip>

            <AppSelectDropBox v-else id="module-select" class="w-full " :show-drawer="showDrawer" :options="moduleObject"/>

        
  
          <div class="w-full h-[1px] bg-neutral-200 dark:bg-neutral-700"></div>
        </div>
        <PerfectScrollbar>
          <div
            ref="content_drawer"
            class="flex p-3 flex-col overflow-x-clip w-full gap-2"
            
          >
            <fwb-tooltip
              v-for="i in menuItems"
              :theme="dark ? 'dark' : 'light'"
              placement="right"
              :active="!showDrawer"
              expanded
              :distance="16"
        
            >
              <template #trigger>
                <div class="flex min-w-full ">
                  <DrawerMenuItems
                    :key="'name'"
                    class="w-full"
                    :icon="i.icon"
                    :not-expand="!showDrawer"
        
                    :title="i.title"
                    :name="'name'"
                    
                  />
                </div>
              </template>
              <template #content>
                <span
                  class="text-sm font-semibold leading-tight text-neutral-900 dark:text-white whitespace-nowrap"
                  >{{ i.title }}</span
                >
              </template>
            </fwb-tooltip>
          </div>
        </PerfectScrollbar>
      </div>
    </aside>
    <div
    v-if="showDrawer"
        class="fixed w-screen xl:hidden h-screen top-0 z-[40] bg-neutral-900 opacity-50"
    ></div>
   
  </template>
  
  <script setup lang="ts">
  import { computed, ref, watch } from "vue";
  import AppSelectDropBox from "../../AppSelectDropBox/presentation/AppSelectDropBox.vue";
//   import { useDrawerMenu } from "../domain/drawerMenu";
  import DrawerMenuItems from "@/components/Drawer/components/presentation/DrawerMenuItem.vue";
  import { useWindowSize } from "@vueuse/core";
  import { PerfectScrollbar } from "vue3-perfect-scrollbar";
  import FwbTooltip from "@/components/FwbTooltip/FwbTooltip.vue";
  
  // const {
  //   getMenuItems,
  //   checkAbilities,
  //   route,
  //   hover,
  //   dark,
  //   getOnlyWithPermission,
  // } = useDrawerMenu();
  const { width } = useWindowSize();
  const props = defineProps({
    value: { type: Boolean, default: false },
    moduleObject: {type: [], required: false},
  });
  
  const content_drawer = ref(null);
  const showDrawer = computed(()=>props.value);




  const dark = true;
  const menuItems = props.moduleObject.length ? [ {
          icon: "dashboard",
          title: "Drawer Item 1",
          name: "mDashboard",
 
        },] : [
        {
          icon: "dashboard",
          title: "Drawer Item 1",
          name: "mDashboard",
 
        },
        {
          icon: "dashboard",
          title: "Drawer Item 2",
          name: "administrator",
 
        },
        {
          icon: "dashboard",
          title: "Drawer Item 3",
          name: "manager",
 
        },
        {
          icon: "dashboard",
          title: "Drawer Item 4",
          name: "mDashboard",
 
        },
        {
          icon: "dashboard",
          title: "Drawer Item 5",
          name: "administrator",
 
        },
        {
          icon: "dashboard",
          title: "Drawer Item 6",
          name: "manager",
 
        },
        {
          icon: "dashboard",
          title: "Drawer Item 7",
          name: "mDashboard",
 
        },
        {
          icon: "dashboard",
          title: "Drawer Item 8",
          name: "administrator",
 
        },
        {
          icon: "dashboard",
          title: "Drawer Item 9",
          name: "manager",
 
        },
        {
          icon: "dashboard",
          title: "Drawer Item 10",
          name: "mDashboard",
 
        },
        {
          icon: "dashboard",
          title: "Drawer Item 11",
          name: "administrator",
 
        },
        {
          icon: "dashboard",
          title: "Drawer Item 12",
          name: "manager",
 
        },
      
      ]
  
 
  </script>
  
<style scoped>
#drawer-navigation {
  height: 100vh
}
</style>
  