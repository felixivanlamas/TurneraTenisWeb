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
    this.cambioDePerfil();
  },

  methods: {
    async getUser(){
      this.usuario = await useUserStore().getUser();
    },
    async cambioDePerfil(){
        const userStore = useUserStore();
        const usuarioEditado = {
        username: '',
        email: '',
        contrasenia: ''
      }
      if(this.usuarioNuevo.username){
        usuarioEditado.username = this.usuarioNuevo.username
      }else{
        delete usuarioEditado.username
      }
      if(this.usuarioNuevo.email ){
        usuarioEditado.email = this.usuarioNuevo.email
      }else{
        delete usuarioEditado.email
      }
      if(this.usuarioNuevo.contrasenia ){
        usuarioEditado.contrasenia = this.usuarioNuevo.contrasenia
      }else{
        delete usuarioEditado.contrasenia
      }

      try {
        const response = await userStore.cambioDePerfil(usuarioEditado);
        this.usuario = response;
        console.log(this.usuario)
        this.$router.push('/');
      } catch (error) {
        console.log(error.response);
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
        <label for="exampleInputEmail1">Username</label>
        <input
        type="text"
        v-model="this.usuarioNuevo.username"
        class="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
        
        />
    </div>
    <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input
        type="password"
        v-model="this.usuarioNuevo.contrasenia"
        class="form-control"
        id="exampleInputPassword1"        
        />
    </div>
    <div class="form-group">
        <label for="exampleInputPassword1">Email</label>
        <input
        type="email"
        v-model="this.usuarioNuevo.email"
        class="form-control"
        id="exampleInputPassword1"        
        />
    </div>
    <button type="submit" class="btn btn-primary">Guardar</button>
</form>



</template>