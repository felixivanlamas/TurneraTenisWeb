import { defineStore } from "pinia";
import { userService } from "../services/userService.js"

export const useUserStore = defineStore("usuario", {
  state: () => {
    return {
      usuario: {
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
        ]
      },
    };
  },

  actions: {
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
          console.log(usuario.username)         
          if (response.status === 401) {
            // Usuario no autenticado
            return null;
          }

          this.usuario = response.data;
        }
        return this.usuario;
      } catch (error) {
        throw new Error(error);
      }
    },

    async reservar(reserva) {
      try {
        const response = await userService.reservar(this.usuario._id,reserva);
        this.usuario = response.data;
        return this.usuario;
      } catch (error) {
        throw error;
      }
    },

    async eliminarReserva(reserva){
      try {
        const response = await userService.eliminarReserva(this.usuario._id,reserva);
        this.usuario = response.data;
        return this.usuario;
      } catch (error) {
        throw error;
      }
    },

    async cambioDeUsername(usuario){
      try {
        console.log(this.usuario)
        await userService.cambioDeUsername(this.usuario._id,usuario);
       if(usuario.username != ''){
        this.usuario.username = usuario.username;
       }

      } catch (error) {
        throw error;
      }
    }

  }
});