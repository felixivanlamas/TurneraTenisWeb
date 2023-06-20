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
    cambioDePerfil(){

        this.usuario.username = this.usuarioNuevo.username;
        this.usuario.contrasenia = this.usuarioNuevo.contrasenia;
        this.usuario.email = this.usuarioNuevo.email;
        
        return this.editorDePerfil(this.usuario);

  },
 
  async editorDePerfil(usuario){
    const userStore = useUserStore();
    try {
        const response = await userStore.cambioDeUsername(usuario);
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
<!--Formulario para cambiar el username-->
<form @submit.prevent="cambioDePerfil()">
    <div class="form-group">
        <label for="exampleInputEmail1">Username:</label>
        <input
        type="text"
        v-model="this.usuarioNuevo.username"
        class="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
        required
        />
    </div>
  
    <button type="submit" class="btn btn-primary">Guardar</button>
</form>
<br>
<!--Formulario para cambiar las password-->
<form @submit.prevent="cambioDePerfil()">
    <div class="form-group">
        <label for="exampleInputPassword1">Password:</label>
        <input
        type="password"
        v-model="this.usuarioNuevo.contrasenia"
        class="form-control"
        id="exampleInputPassword1"
        required
        />
    </div>
    <button type="submit" class="btn btn-primary">Guardar</button>
</form>
<br>
<!--Formulario para cambiar el email-->
<form @submit.prevent="cambioDePerfil()">
    <div class="form-group">
        <label for="exampleInputPassword1">Email:</label>
        <input
        type="email"
        v-model="this.usuarioNuevo.email"
        class="form-control"
        id="exampleInputPassword1"
        required
        />
    </div>
    <button type="submit" class="btn btn-primary">Guardar</button>
</form>


</template>