import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: `/`,
      redirect: `/home`,
      children: [
        {
          path: `/`,
          name: `home`,
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(`@/content-script/views/FillFormView.vue`),
          meta: { title: `Form` },
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
