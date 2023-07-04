import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/userViews/HomeView.vue";
import Login from "../views/userViews/Login.vue"
import RegisterView from "../views/userViews/RegisterView.vue"
import ReservasView from "../views/userViews/ReservasView.vue"
import EditarPerfilViewVue from "../views/userViews/EditarPerfilView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/reservations",
      name: "reservations",
      component: ReservasView,
    },
    {
      path: "/editProfile",
      name: "editProfile",
      component: EditarPerfilViewVue,
    }
  ],
});

export default router;
