<script>
import { userService } from "../services/userService.js"
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/user.js";

export default {
  setup() {
    const store = useUserStore();
    const { usuario } = storeToRefs(store);
    return {
      usuario,
    };
  },
  data() {
    return {
      usuario: {
        email: "",
        contrasenia: "",
      },
      vue: this,
    };
  },
  methods: {
    loguear: async (usuario, vue) => {
      try {
        const response = await userService.login(usuario);
        const usuarioRes = response.data;
        vue.usuario = usuarioRes;
        vue.$router.push("/");
      } catch (error) {
        console.log(error);
        alert(error.response.data);
      }
    },
  },
};
</script>

<template>
  <h1>Login</h1>
  <form @submit.prevent="loguear(usuario, vue)">
    <div class="form-group">
      <label for="exampleInputEmail1">Email address</label>
      <input
        v-model="usuario.email"
        type="email"
        class="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
        required
      />
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Password</label>
      <input
        v-model="usuario.contrasenia"
        type="password"
        class="form-control"
        id="exampleInputPassword1"
        required
      />
    </div>
    <button type="submit" class="btn btn-primary">Login</button>
  </form>
</template>

<style></style>
