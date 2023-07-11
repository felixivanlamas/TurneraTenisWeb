import { defineStore } from "pinia";
import { userService } from "../services/userService";

export const useReservaStore = defineStore('reserva', {
  state: () => ({
    reservas: [],
  }),
  actions: {
    async setReservas() {
      try {
        const usuarios = await this.getUsers();
        for (const usuario of usuarios) {
          if (!usuario.email.includes('@admin')) {
            for (const r of usuario.reservas) {
              let reserva = {
                id: usuario._id,
                username: usuario.username,
                titulo: r.titulo,
                dia: r.dia,
                horario: r.horario
              };
              this.reservas.push(reserva);
            }
          }
        }
      } catch (error) {
        throw error;
      }
    },

    async getUsers() {
      try {
        const response = await userService.getAll();
        const usuarios = response.data
        console.log(usuarios);
        return usuarios;
      } catch (error) {
        throw error;
      }
    },
    
    async eliminarCancha(){
        //borrar del back
        
        //borrar del front
        
    }

  },

  getters: {
    getReservas() {
      return this.reservas;
    }
  }
});
