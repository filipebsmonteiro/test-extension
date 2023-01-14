<script setup>
import { RouterLink, RouterView, useRouter, useRoute } from "vue-router";
import PopupService from "@/services/popup/PopupService";

const route = useRoute();
if (!route.name) {
  const router = useRouter();
  router.push({ name: `home` });
}

const refresh = () => {
  PopupService.reloadPage(true);
};
</script>

<template>
  <div class="flex justify-between m-2">
    <RouterLink
      :to="$route.name === `config` ? `/` : `/config`"
      class="hover-point"
    >
      <font-awesome-icon :icon="['fas', 'gear']" />
    </RouterLink>
    <h3>{{ $route.meta.title || `` }}</h3>
    <span class="cursor-pointer" @click="refresh">
      <font-awesome-icon :icon="['fas', 'recycle']" />
    </span>
  </div>

  <div class="p-2">
    <RouterView />
  </div>
</template>
