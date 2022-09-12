import CardListView from "@/views/CardListView.vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: CardListView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ProductListView.vue"),
  },
  {
    path: "/books",
    name: "AllBooks",
    component: () => import("../views/AllBooksView.vue"),
  },

  {
    path: "/week2",
    name: "Week2",
    component: () => import("../views/WeekTwoView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
