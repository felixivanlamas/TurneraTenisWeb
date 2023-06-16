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
        this.canchas = response.data;
      } catch (error) {
        console.error(error);
        throw new Error('Error al obtener las canchas');
      }
    },
  },
});
