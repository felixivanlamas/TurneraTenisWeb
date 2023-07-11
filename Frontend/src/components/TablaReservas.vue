<template>
  <div class="col-6">
    <h3>Reservas</h3>
    <table class="table">
      <thead>
        <tr>
          <th>Día</th>
          <th>Horario</th>
          <th>Usuario</th>
          <th>Eliminar Reserva</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="reserva in reservas" :key="reserva.id">
          <td>{{ reserva.dia }}</td>
          <td>{{ reserva.horario }}</td>
          <td>{{ reserva.username }}</td>
          <td class="d-flex justify-content-center align-items-center">
            <button class="btn-danger" @click="eliminar_Reserva(reserva)">X</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { computed } from 'vue';

import { storeToRefs } from "pinia";
import { useReservaStore } from "../stores/reservas.js";


export default {
  props: {
    canchaSeleccionada: {
      type: Object,
      required: true,
    },
  },

  setup() {
    const reservaStore = useReservaStore();

    // Filtrar las reservas basadas en el título de la reserva y la cancha seleccionada
    const reservasFiltradas = computed(() => {
      const tituloCanchaSeleccionada = this.canchaSeleccionada.titulo;

      return reservaStore.reservas.value.filter(
        (reserva) => reserva.titulo === tituloCanchaSeleccionada
      );
    });

    return {
      reservas: reservasFiltradas,
    };
  },
};
</script>

<style>
/* Estilos CSS si es necesario */
</style>
