import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/activities"
  },
  {
    path: "/activities",
    name: "activities",
    component: () => import("../views/Activities.vue"),
    meta: {
      step: 1
    }
  },
  {
    path: "/rooms",
    name: "rooms",
    component: () => import("../views/Rooms.vue"),
    meta: {
      step: 2
    }
  },
  {
    path: "/transfers",
    name: "transfers",
    component: () => import("../views/Transfers.vue"),
    meta: {
      step: 3
    }
  },
  {
    path: "/details",
    name: "zublu-details",
    component: () => import("../views/Details.vue"),
    meta: {
      step: 4
    }
  },
  {
    path: "/review",
    name: "review",
    component: () => import("../views/Review.vue"),
    meta: {
      step: 5
    }
  },
  {
    path: "/thank-you",
    name: "thankyou",
    component: () => import("../views/Thankyou.vue"),
    meta: {
      step: 6
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
export default router;
