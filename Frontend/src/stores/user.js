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
  mutations: {
    setUserId(state, id) {
      state.usuario.id = id;
    },
  },
  actions: {
    updateUserId(id) {
      this.setUserId(id);
    },
    async editarUsuario(usuario) {
      try {
        const response = await userService.editarUsuario(usuario);
        this.usuario = response.usuario;
      } catch (error) {
        alert("El usuario no pudo actualizarse. Error: " + error);
      }
    }
  }
});