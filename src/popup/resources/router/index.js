import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: `/`,
      redirect: `/home`,
      // component: () => import("@/popup/App.vue"),
      children: [
        {
          path: `/`,
          name: `home`,
          component: () => import(`@extension/resources/views/FillFormView.vue`),
          meta: { title: `Form` },
        },
        {
          path: `/config`,
          name: `config`,
          component: () => import(`@extension/resources/views/ConfigView.vue`),
          meta: { title: `Config` },
        },
        {
          path: `/storage`,
          name: `storage`,
          component: () => import(`@extension/resources/views/StorageView.vue`),
          meta: { title: `Storage` },
        },
      ],
    },
    // {
    //   path: "*",
    //   component: () => import("@/popup/views/PopupView.vue"),
    // },
  ],
});

export default router;
