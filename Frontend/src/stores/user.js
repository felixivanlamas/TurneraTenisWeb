import { defineStore } from "pinia";
import { userService } from "../services/userService.js"

export const useUserStore = defineStore("usuario", {
  state: () => {
    return {
      usuario: {
        id: null,
        username: "",
        email: "",
        contrasenia:"",
        reservas: []
      },
    };
  },

  actions: {
    async login(usuario) {
      try {
        const response = await userService.login(usuario);
        this.usuario = response.data;
      } catch (error) {
        console.error("Error en el inicio de sesión:", error);
        throw error;
      }
    },
    async editarUsuario(usuario) {
      try {
        const response = await userService.editarUsuario(usuario);
        this.usuario = response.data;
      } catch (error) {
        console.error("Error al editar el usuario:", error);
        throw error;
      }
    }
  }
});