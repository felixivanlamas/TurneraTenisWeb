<script>
import { userService } from "../services/userService.js"

export default {
  data() {
    return {
      usuario: {
        username:"",
        email: "",
        contrasenia: "",
      },
      vue: this,
    };
  },
  methods: {
    async registrarUsuario(vue) {
      try {
        const response = await userService.register(this.usuario);
        alert(response.data);
        vue.$router.push("/");
      } catch (error) {
        console.log(error.response.data);
        alert(error.response.data);
      }
    }
  },
};
</script>

<template>
    <h1>Registro de usuario</h1>
    <form @submit.prevent="registrarUsuario(vue)">
        <div class="form-group">
        <label for="exampleInputEmail1">Usuario</label>
        <input
          v-model="usuario.username"
          class="form-control"
          placeholder="ingrese usuario"
          required
        />
        </div>
        <div class="form-group">
        <label>Mail</label>
        <input
          v-model="usuario.email"
          type="email"
          class="form-control"
          placeholder="Ingrese mail"
          required
        />
        </div>
        <div class="form-group">
        <label>Contraseña</label>
        <input
          v-model="usuario.contrasenia"
          type="password"
          class="form-control"
          id="pass"
          placeholder="Ingrese contraseña"
          required
        />
        </div>
         <div class="form-group">
        <label>Repetir Contraseña</label>
        <input
          type="password"
          class="form-control"
          id="passRep"
          placeholder="Repita la contraseña"
          required
        />
        </div>
      <button type="submit" class="btn btn-primary">Registrarse</button>
    </form>
  </template>