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
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(`@extension/resources/views/ConfigView.vue`),
          meta: { title: `Config` },
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
