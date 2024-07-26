<template>
  <div
    class="w-full flex flex-col justify-start items-center gap-0 rounded-b-lg h-full pb-0"
  >
    <FwbTable
      class="w-full h-full relative overflow-hidden"
      hoverable
      @mouseenter="onEnter"
      @mouseleave="onLeave"
    >
      <FwbTableHead v-if="showHeader">
        <FwbTableHeadCell
          v-for="(header, index) in headers"
          v-show="header.title"
          :key="index"
        >
          <template #suffix>
            <!--Cargar esto en el proyecto para si se quiere mostrar un icono-->
            <!--<component
              :is="getFBIcon('chevron-sort')"
              class="h-[11px] w-[10px]"             
            />-->
          </template>
          {{ header.title }}
        </FwbTableHeadCell>
      </FwbTableHead>
      <FwbTableBody>
        <template v-if="_content.length > 0 && !loading">
          <FwbTableRow
            v-for="(item, index) in _content"
            :key="item.id"
            @click="emitEvents(item, item.index)"
          >
          <div class="flex justify-between items-center">
         <FwbTableCell
              v-for="(header, index) in headers"
              :key="header.key"
            >
              <div class="flex justify-between items-center">                
                {{ item[header.key] }}               
              </div>
              
            </FwbTableCell>  
            <div class="flex justify-between items-center">  
              <div id="slot" ref="slotRef" class="w-min mr-4">
                  <slot name="default" :item="item.item" />
              </div> 
              </div>
            </div>           
          </FwbTableRow>
        </template>
      </FwbTableBody>
    </FwbTable>
  </div>
</template>

<script setup lang="ts">

import FwbTable from "../FwbTable/FwbTable.vue";
import FwbTableBody from "../FwbTable/FwbTableBody.vue";
import FwbTableCell from "../FwbTable/FwbTableCell.vue";
import FwbTableHead from "../FwbTable/FwbTableHead.vue";
import FwbTableHeadCell from "../FwbTable/FwbTableHeadCell.vue";
import FwbTableRow from "../FwbTable/FwbTableRow.vue";
import { ref, computed, reactive, type PropType, watch } from "vue";
import { storeToRefs } from "pinia";

import type { AppTablePropsInterface } from "./interfaces/app_table_interfaces";


const emit = defineEmits(["info", "index"]);

const emitEvents = (item: any, index: number) => {
  emit("info", item);
  emit("index", index);
};

const props = defineProps({
  tableConfig: {
    type: Object as PropType<AppTablePropsInterface>,
    required: true,
  },
  showHeader: { type: Boolean, default: true },
  maxHeigth: { type: Number, default: 0 },
});

const loading = ref()
const headers = ref(props.tableConfig.tableContent);
const content = computed(() => props.tableConfig.items);
const _content = ref<any[]>([]);

watch(
  content,
  (val) => {
    _content.value = content.value;
  },
  { deep: true, immediate: true }
);

const itemToShow = ref(null);
const itemToEdit = ref(null);

const handleShowItem = (item) => {
  itemToShow.value = item;
};

const inside = ref(false);

const onEnter = () => {
  inside.value = true;
};

const onLeave = () => {
  inside.value = false;
};
</script>

<style scoped></style>
