import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  mode: `abstract`,
  routes: [
    {
      path: `/`,
      redirect: { name: `home` },
      children: [
        {
          name: `home`,
          path: `/home`,
          component: () => import(`@content/resources/views/HomeView.vue`),
        },
        {
          path: `/recording`,
          component: () => import(`@content/resources/views/RecordingView.vue`),
        },
      ],
    },
    // {
    //   path: `/:catchAll(.*)`,
    //   component: () => import(`@content/resources/views/HomeView.vue`),
    // },
  ],
});

export default router;
