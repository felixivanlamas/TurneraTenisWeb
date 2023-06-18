<script>
import {useUserStore} from "../stores/user.js"

export default {
  data() {
    return {
        usuario: {},
        usuarioNuevo: {
        username:"",
        email: "",
        contrasenia: "",
      },
    };
  },
  created() {

  },
  async mounted(){ 
    this.getUser();
  },

  methods: {
    async getUser(){
      this.usuario = await useUserStore().getUser();
      console.log(this.usuario.username)
    },
    async cambioDePerfil(){
        const userStore = useUserStore();

        const usuario = {
        username: this.usuarioNuevo.username,
        email: this.usuarioNuevo.email,
        contrasenia: this.usuarioNuevo.contrasenia
      }

        console.log(usuario)

      try {
        const response = await userStore.cambioDePerfil(usuario);
        console.log(response);
        this.$router.push('');
      } catch (error) {
        console.log(error.response.data);
      }
    }

  }
};


</script>

<template>

<h2>Edición de perfil</h2>
<br>
<form @submit.prevent="cambioDePerfil()">
    <div class="form-group">
        <label for="exampleInputEmail1">Username Actual:</label>
        <input
        type="text"
        v-model="this.usuarioNuevo.username"
        class="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
        :placeholder="usuario.username"
        required
        />
    </div>
    <div class="form-group">
        <label for="exampleInputPassword1">Password Actual:</label>
        <input
        type="password"
        v-model="this.usuarioNuevo.contrasenia"
        class="form-control"
        id="exampleInputPassword1"
        :placeholder='usuario.contrasenia'
        required
        />
    </div>
    <div class="form-group">
        <label for="exampleInputPassword1">Email Actual:</label>
        <input
        type="email"
        v-model="this.usuarioNuevo.email"
        class="form-control"
        id="exampleInputPassword1"
        :placeholder="usuario.email"
        required
        />
    </div>
    <button type="submit" class="btn btn-primary">Guardar</button>
</form>



</template>