import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import("../views/Register.vue")
  },
  {
    path: "/homepage",
    name: "Homepage",
    component: () =>
      import("../views/Homepage.vue")
  },
  {
    path: "/staff",
    name: "Staff",
    component: () =>
      import("../views/Staff.vue")
  },
  {
    path: "/service",
    name: "Service",
    component: () =>
      import("../views/Service.vue")
  },
  {
    path: "/booking",
    name: "Booking",
    component: () =>
      import("../views/Booking.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
