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
    async login(credenciales) {
      try {
        const response = await userService.login(credenciales);
        this.usuario = response.data;
      } catch (error) {
        console.error("Error en el inicio de sesión:", error);
        throw error;
      }
    },
  }
});