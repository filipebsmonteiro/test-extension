<script setup>
import { RouterLink, RouterView, useRouter, useRoute } from "vue-router";

const route = useRoute();
if (!route.name) {
  const router = useRouter();
  router.push({ name: "home" });
}
</script>

<template>
  <RouterLink
    :to="$route.name === `config` ? `/` : `/config`"
    class="btn-sm btn-outline btn-circle m-2"
  >
    <font-awesome-icon :icon="['fas', 'gear']" />
  </RouterLink>

  <div class="p-2">
    <RouterView />
  </div>
</template>
