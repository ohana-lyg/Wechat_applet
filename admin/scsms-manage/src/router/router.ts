import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Login",
    component: () => import("@/views/ManageLogin.vue"),
  },
  {
    path: "/home",
    name: "Home",
    redirect: "/home/order",
    component: () => import("@/views/ManageHome.vue"),
    children: [
      {
        path: "order",
        name: "Order",
        component: () => import("@/views/OrderManage.vue"),
      },
      {
        path: "people",
        name: "People",
        component: () => import("@/views/PeopleManage.vue"),
      },
      {
        path: "comment",
        name: "Comment",
        component: () => import("@/views/CommentManage.vue"),
      },
      {
        path: "business",
        name: "Business",
        component: () => import("@/views/BusinessManage.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
