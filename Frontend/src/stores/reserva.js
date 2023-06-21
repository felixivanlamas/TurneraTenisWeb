import { defineStore } from "pinia";
export const useReservaStore = defineStore("reserva", {
  state: () => {
    return {
      reserva: {
        titulo: '',
        dia: '',
        horario: '',
      },
    };
  },

  actions: {
    async guardarDatos(titulo,dia,horario) {
      this.reserva.titulo = titulo;
      this.reserva.dia = dia;
      this.reserva.horario = horario;
    },

    async obtenerReserva(){
        return this.reserva
    },

  }
});