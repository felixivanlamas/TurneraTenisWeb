<script>
import { storeToRefs } from "pinia";
import { RouterLink } from "vue-router";
import { useUserStore } from "../stores/user.js";


export default {
  setup() {

    const store = useUserStore();
    const { usuario } = storeToRefs(store);

    return {
      usuario,
    }
  },

  methods:{
    logout() {
      const store = useUserStore();
      this.usuario = store.logout()
    }
  }

};
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <RouterLink class="navbar-brand" to="/">
      <img src="../assets/IconoTT.jpg" class="logo" alt="Logo" />
      <span class="brand-text">TurneraTenis</span>
    </RouterLink>
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
      <ul class="navbar-nav ml-auto">
        <li class="nav-item" v-if="usuario.username != ''">
          <RouterLink class="nav-link" to="/reservations">
            <button class="btn btn-info">Mis Reservas</button>
          </RouterLink>
        </li>
        <li v-if="usuario.username != ''" class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            role="button"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <h4 class="btn btn-username">{{ usuario.username }}</h4>
          </a>
          <div class="dropdown-menu dropdown-menu-right">
            <RouterLink to="/editProfile" class="dropdown-item">
              <button class="btn btn-info btn-block">Editar Perfil</button>
            </RouterLink>
            <div class="dropdown-divider"></div>
            <RouterLink to="/" class="dropdown-item">
              <button
                @click="logout()"
                class="btn btn-outline-info btn-block"
              >
                Cerrar Sesión
              </button>
            </RouterLink>
          </div>
        </li>
      </ul>
      <div
        class="d-flex align-items-center my-2 my-lg-0"
        v-if="usuario.username == ''"
      >
        <RouterLink to="/login">
          <button class="btn btn-warning">Iniciar Sesión</button>
        </RouterLink>
        <RouterLink to="/register">
          <button class="btn btn-warning">Registrarse</button>
        </RouterLink>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo {
  width: 50px;
  height: 50px;
}

.brand-text {
  font-size: 20px;
  margin-left: 10px;
}

.nav-link {
  color: #000;
}

.dropdown-toggle::after {
  display: none;
}

.dropdown-item {
  color: #000;
}

.dropdown-item:hover,
.dropdown-item:focus {
  background-color: #f0f0f0;
}

.btn-info {
  background-color: #2196f3;
  border-color: #2196f3;
}

.btn-outline-info {
  background-color: transparent;
  border-color: #2196f3;
  color: #2196f3;
}

.btn-outline-info:hover,
.btn-outline-info:focus {
  background-color: #2196f3;
  color: #fff;
}

.btn-warning {
  background-color: #ff9800;
  border-color: #ff9800;
}

.btn-warning:hover,
.btn-warning:focus {
  background-color: #fb8c00;
  border-color: #fb8c00;
}

.btn-username {
  background-color: #2196f3;
  color: #fff;
  width: 100px;
}

.btn-username:hover {
  background-color: #072944;
  color: #fff;
}

.btn {
  margin-right: 20px;
}
</style>