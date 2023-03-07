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
          component: () => import(`@popup/resources/views/FillFormView.vue`),
          meta: { title: `Form` },
        },
        {
          path: `/config`,
          name: `config`,
          component: () => import(`@popup/resources/views/ConfigView.vue`),
          meta: { title: `Config` },
        },
        {
          path: `/storage`,
          name: `storage`,
          component: () => import(`@popup/resources/views/StorageView.vue`),
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
