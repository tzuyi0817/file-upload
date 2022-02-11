import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Index from '@/views/Index.vue';

const routes: RouteRecordRaw[] = [
  {
    path: "/:catchAll(.*)",
    redirect: "/",
  },
  {
    path: "/",
    name: "Index",
    meta: {
      type: "Index",
    },
    component: Index,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
