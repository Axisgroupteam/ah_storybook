<template>
  <tr>
    <td :colspan="tdLength">
      <div class="flex h-[0.2rem] justify-center">
        <div class="h-full w-full loading-td-1 flex max-w-[calc(100%/3*2)] bg-red-500">
          <!-- <div
            class="bg-gradient-to-r from-red-500/0 to-red-500/100 h-full flex-1"
          ></div>
          <div
            class="bg-gradient-to-r from-red-500/100 to-red-500/0 h-full flex-1"
          ></div> -->
        </div>
      </div>
    </td>
  </tr>
</template>
<script lang="ts" setup>
defineProps({
  tdLength: { type: Number, default: 0 }
})
</script>

<style scoped>
.loading-td {
  animation: loading 2s linear infinite;
}
.loading-td-parent {
  animation: loadingParent 2s linear infinite;
}
@keyframes loading {
  0% {
    width: 0;
    opacity: 50%;
  }
  50% {
    width: 100%;
    opacity: 100%;
  }
  100% {
    width: 0;
    opacity: 50%;
  }
}
@keyframes loadingParent {
  0% {
    justify-content: flex-start;
  }

  100% {
    justify-content: flex-end;
  }
}

/* other */
.loading-td-1 {
  animation: loading 2s linear infinite;
}

@keyframes loading {
  0% {
    transform: translate(-150%, 0);
    opacity: 75%;
  }
  50% {
    opacity: 100%;
  }
  100% {
    opacity: 75%;
    transform: translate(150%, 0);
  }
}
</style>
