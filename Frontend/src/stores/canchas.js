import { defineStore } from 'pinia';
import { canchasService } from "../services/canchasService.js"

export const useCanchasStore = defineStore('canchas', {
  state: () => ({
    canchas: [],
  }),
  actions: {
    async fetchCanchas() {
      try {
        const response = await canchasService.getAll();
        console.log(response.data);
        this.canchas = response.data;
        this.canchas.sort((a, b) => a.titulo.localeCompare(b.titulo));

      } catch (error) {
        console.error(error);
        throw new Error('Error al obtener las canchas');
      }
    },

  },
});



