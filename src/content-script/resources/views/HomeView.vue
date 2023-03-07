<script setup>
import { onMounted } from "vue";

onMounted(() => {
  console.log(`Home View Loaded`);
});
</script>

<template>
  <RouterLink
    :to="`/recording`"
    class="btn btn-error text-white absolute bottom-0"
  >
    RECORD
  </RouterLink>
</template>
