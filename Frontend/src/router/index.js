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
<<<<<<< HEAD
=======
    {
      //esta vista hay que ver que tan necesaria es
      path: "/reserva",
      name: "reserva",
      component: () => import("../views/Reservar.vue"),
      
    },
    {
      path: "/editProfile",
      name: "editProfile",
      component: () => import("../views/EditarPerfilView.vue"),
    }
>>>>>>> a146ff6ffe38d650792ec1063976dde671ba39db
  ],
});

export default router;
