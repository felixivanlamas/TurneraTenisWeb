import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/canchas",
      name: "cancha",
      component: () => import("../views/CanchaView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/Login.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/RegisterView.vue"),
    },
    {
      path: "/reservations",
      name: "reservations",
      component: () => import("../views/ReservasView.vue"),
    },
    {
      path: "/reserva",
      name: "reserva",
      component: () => import("../views/Reservar.vue"),
      
    }
  ],
});

export default router;
