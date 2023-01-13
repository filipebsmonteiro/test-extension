<script setup>
import { RouterLink, RouterView, useRouter, useRoute } from "vue-router";

const route = useRoute();
if (!route.name) {
  const router = useRouter();
  router.push({ name: `home` });
}
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
    <span style="color: transparent">A</span>
  </div>

  <div class="p-2">
    <RouterView />
  </div>
</template>
