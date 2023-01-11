import { createRouter, createWebHistory } from "vue-router";
// import Popup from "@/popup/views/PopupView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      // component: Popup,
      component: () => import("@/popup/views/PopupView.vue"),
    },
    {
      path: "/config",
      name: "config",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("@/popup/views/ConfigView.vue"),
    },
  ],
});

export default router;
