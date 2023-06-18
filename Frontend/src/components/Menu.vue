<script>
import { storeToRefs } from "pinia";
import { RouterLink } from "vue-router";
import { userService } from "../services/userService.js"
import { useUserStore } from "../stores/user.js";


export default {
  setup() {

    const store = useUserStore();
    const { usuario } = storeToRefs(store);

    return {
      usuario,
    }
  },
  
  methods: {
    async salir() {
      await userService.logout(this.usuario.email);

      this.usuario.username = '';
      this.usuario.email = '';
      this.usuario.contrasenia = '';
      this.$router.push('/');
    },
  },
  /* created() {
    if (this.usuario.nombre === '') {
      userService.devolverUsuario(id)
        .then(response => {
          if (response.data) {
            this.usuario = response.data;
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, */

};
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <RouterLink class="navbar-brand" style="font-size: 30px;" to="/"> <img src="../assets/IconoTT.jpg" style="widows:50px; height: 50px;" alt="Logo" class="d-inline-block align-text-top">
      TurneraTenis</RouterLink>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item" v-if="usuario.username != ''">
          <RouterLink class="nav-link" to="/reservations"
            > <button class=" btn btn-info">Mis Reservas</button></RouterLink
          >
        </li>
        <li v-if="usuario.username != ''" class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            role="button"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <h4>{{usuario.username}}</h4>
          </a>
          <div class="dropdown-menu">
            <RouterLink to="/editProfile" class="dropdown-item" href="#"> <button class="btn btn-info">Editar Perfil</button></RouterLink>
            <div class="dropdown-divider"></div>
            <RouterLink to="/" class="dropdown-item"><button @click="usuario.username = ''" class="btn btn-outline btn-info">Cerrar Sesion</button></RouterLink>
          </div>
        </li>
      </ul>
      <div class="d-flex align-items-center my-2 my-lg-0" v-if="usuario.username == ''">
        <RouterLink to="/login"
          ><button style="margin: 0px 10px;" class="btn btn-warning" >
            Iniciar Sesion
          </button></RouterLink
        >
        
        <RouterLink to="/register"
          ><button
            class="btn btn-warning"
            >
            Registrarse
          </button></RouterLink
        >
      </div>
    </div>
  </nav>
</template>

<style></style>
