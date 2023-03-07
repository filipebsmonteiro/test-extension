<script setup>
// import browser from "webextension-polyfill";
import { RouterView, useRouter, useRoute } from "vue-router";
import { onMounted } from "vue";

if (!useRoute().name) useRouter().push(`/`);

onMounted(() => import(`@content/application/mensageria/MessageListener`));

// send To Background
// browser.runtime.sendMessage(`Message From Content Script`);
</script>

<template>
  <div class="absolute p-4" style="display: contents">
    <RouterView />
  </div>
</template>
