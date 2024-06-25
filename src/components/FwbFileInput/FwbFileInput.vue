

<template>
  <div>
     <label v-if="label" :class="labelClassesComputed"
      >{{ label }} <span v-if="required" class="text-red-500">* </span></label
    >
  
    <div class="file-upload-wrapper" @click="triggerFileInput">     
        <div class="flex relative">
           <div
              v-if="$slots.prefix"             
              class="w-24 flex absolute inset-y-0 left-0 items-center overflow-hidden  justify-center rounded-tl-lg rounded-bl-lg h-full"
              :style="{ backgroundColor: validationStatus== 'error' ? '#B91C1C' : color }"
            >
              <slot name="prefix" />
            </div>
            <input 
              id="file-input"
              v-bind="$attrs"
              :value="fileNameSelected"
              :disabled="disabled"        
              :required="required"
              class="focus:outline-none"
              :class="[
                inputClasses,
                $slots.prefix ? 'pl-28' : '',
                dark ? 'autofill-text' : '',
              ]"
              :readonly="readonly"
              />
            <div
              v-if="$slots.suffix"
              class="absolute flex items-center justify-center w-[40px] h-full cursor-pointer bg-transparent right-[1px] bottom-0"
              @click="toggle"
            >
              <slot name="suffix" />
            </div>
          </div>
          <p v-if="$slots.validationMessage" :class="validationWrapperClasses">
            <slot name="validationMessage" />
          </p>        
      <input type="file" ref="fileInput" @change="handleFileChange" style="display: none;" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref, toRefs } from "vue";
  import {
    validationStatusMap,
    type InputSize,
    type InputType,
    type ValidationStatus,   
  } from "./types";
  import { useInputClasses } from "./composables/useInputClasses";
import { twMerge } from "tailwind-merge";

  interface InputProps {
    disabled?: boolean;
    label?: string;
    modelValue: string;
    required?: boolean;
    size?: InputSize;
    type?: InputType;
    validationStatus?: ValidationStatus;
    readonly?: boolean;
    color?: string;
  }

  const props = withDefaults(defineProps<InputProps>(), {
    disabled: false,
    label: "",
    modelValue: "",
    required: false,
    size: "md",
    type: "text",
    validationStatus: undefined,
    readonly: false,
    color: '#262626'
  });

  const { inputClasses, labelClasses } = useInputClasses(toRefs(props));

  const emit = defineEmits(["update:modelValue", "file-selected", "toggleVisibility"]);
  const fileName = ref("");
  const fileInput = ref(null);
  const file = ref([]);
  const dark = ref(false)

  const labelClassesComputed = computed(() => labelClasses.value);

  const fileNameSelected = computed(() => {
    return fileName.value ? fileName.value : props.modelValue ? props.modelValue : "No se ha seleccionado ningún archivo.";
  });

  const validationWrapperClasses = computed(() =>
  twMerge(
    "mt-2 text-sm",
    props.validationStatus === validationStatusMap.Success
      ? "text-green-600 dark:text-green-500"
      : "",
    props.validationStatus === validationStatusMap.Error
      ? "text-red-600 dark:text-red-500"
      : ""
  )
);

  const toggle = () => {
    emit("toggleVisibility");
  };

   const triggerFileInput = () => {
      fileInput.value?.click();
    };

    const handleFileChange = (event: any) => {
      file.value = event.target.files[0];
      if (file.value) {
        fileName.value = file.value.name;
        emit('file-selected', file);
        emit("update:modelValue", fileName.value);
      } else {
        fileName.value = '';
      }
    }


</script>

<style scoped>



</style>