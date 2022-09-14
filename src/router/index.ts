import CardListView from "@/views/CardListView.vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import ProductDetails from "@/views/product/Details.vue";
import ProductSpecs from "@/views/product/Specs.vue";
import ProductLayout from "@/views/product/Layout.vue";
import ProductAbout from "@/views/product/About.vue";
import NProgress from "nprogress";
import CartView from "@/views/CartView.vue";

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
    component: () => import("../views/Week2Layout.vue"),
    children: [
      {
        path: "cart",
        name: "Cart",
        component: () => CartView,
      },
      {
        path: "products",
        name: "Products",
        component: () => import("../views/LapListView.vue"),
      },
      {
        path: "products/:id",
        name: "Product",
        component: ProductLayout,
        props: true,
        children: [
          {
            path: "",
            name: "ProductAbout",
            component: () => ProductAbout,
          },
          {
            path: "details",
            name: "ProductDetails",
            component: () => ProductDetails,
          },
          {
            path: "specs",
            name: "ProductSpecs",
            component: () => ProductSpecs,
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from) => {
  NProgress.start();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
