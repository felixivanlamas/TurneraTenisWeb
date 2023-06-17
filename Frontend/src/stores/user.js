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
        reservas: []
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
        console.error("Error en el inicio de sesión:", error);
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
          if (response.status === 401) {
            // Usuario no autenticado
            return null;
          }

          this.usuario = response.data;
        }
        return this.usuario;
      } catch (error) {
        throw error;
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
    }

  }
});