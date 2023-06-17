<script>
import { useUserStore } from "../stores/user.js";

export default {
  data() {
    return {
      usuario: {
        username:"",
        email: "",
        contrasenia: "",
      },
      contraseniaRepetida: "",
    };
  },
  methods: {
    async registrar() {
      const userStore = useUserStore();
      const usuario = {
        username: this.usuario.username,
        email: this.usuario.email,
        contrasenia: this.usuario.contrasenia
      }

      if (this.usuario.contrasenia !== this.contraseniaRepetida) {
        console.log("Las contraseñas no coinciden");
        return;
      }

      try {
        const response = await userStore.register(this.usuario);
        console.log(response);
        this.$router.push('/');
      } catch (error) {
        console.log(error.response.data);
      }
    }
  },
};
</script>

<template>
    <h1>Registro de usuario</h1>
    <form @submit.prevent="registrar()">
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
          v-model="contraseniaRepetida"
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