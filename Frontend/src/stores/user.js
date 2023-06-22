import { defineStore } from "pinia";
import { userService } from "../services/userService.js"
import { reservasService } from "../services/reservaService.js";

export const useUserStore = defineStore("usuario", {
  state: () => {
    return {
      listaUsuarios:[],
      usuario: {
        _id: null,
        username: "",
      },
    };
  },

  actions: {
    async getAll(){
      try {
        const response = await userService.getAll();
        this.listaUsuarios = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async login(credenciales) {
      try {
        const response = await userService.login(credenciales);
        this.usuario = response.data;
        return this.usuario;
      } catch (error) {
        alert("Email y/o contraseña es incorrecto!")
        throw error;
      }
    },

    async register(usuario) {
      try {
        const response = await userService.register(usuario);
        this.usuario = response.data;
        return this.usuario;
      } catch (error) {
        console.error("Error en el registro:", error);
        throw error;
      }
    },

    async getUser() {
      try {
        if(this.usuario._id==null){
          response = await userService.getUser(this.usuario._id); 
          this.usuario = response.data;
        }
        return this.usuario;
      } catch (error) {
        throw new Error(error);
      }
    },

    async reservar(reserva) {
      try {
        const response = await reservasService.reservar(this.usuario._id,reserva);
        this.usuario = response.data;
        console.log(this.usuario);
        return this.usuario;
      } catch (error) {
        throw error;
      }
    },

    async eliminarReserva(reserva){
      try {
        const response = await reservasService.eliminarReserva(this.usuario._id,reserva);
        this.usuario = response.data; // Acceder al usuario actualizado
        return this.usuario;
      } catch (error) {
        throw error;
      }
    },

    async cambioDePerfil(usuarioAEditar){
      try {
        const response = await userService.cambioDePerfil(this.usuario._id,usuarioAEditar);
        this.usuario = response.data; 
        return this.usuario;
      } catch (error) {
        throw error;
      }
    },

    logout () {
      return this.usuario={ 
        _id: null,
        username: "",
        email: "",
        contrasenia:"",
        reservas: [
          {
            titulo: "",
            dia: "",
            horario: "",
          },
        ]};
    }

  }
});