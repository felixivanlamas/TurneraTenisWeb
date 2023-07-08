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
        <template v-for="reservaDia in reservasPorDia">
          <tr v-for="reserva in reservaDia.reservas" :key="reserva.id">
            <td v-if="reservaDia.reservas.indexOf(reserva) === 0" :rowspan="reservaDia.reservas.length">
              {{ reservaDia.dia }}
            </td>
            <td>{{ reserva.horario }}</td>
            <td>{{ reserva.username }}</td>
            <td class="d-flex justify-content-center align-items-center">
              <button class="btn-danger" @click="eliminarReserva(reserva)">X</button>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>

export default {
  props: {
    canchaSeleccionada: {
      type: Object,
      required: true,
    },
    reservas: {
      type: Array,
      required: true,
    },
    eliminarReserva: {
      type: Function,
      required: true,
    }
  },

  computed: {
    reservasPorDia() {
      const reservasPorDia = [];

      // Agrupar las reservas por día
      const reservasAgrupadas = this.groupByDia();

      // Crear una estructura de datos con los días y las reservas de cada día
      for (const dia in reservasAgrupadas) {
        const reservas = reservasAgrupadas[dia];
        reservasPorDia.push({ dia, reservas });
      }

      return reservasPorDia;
    },
  },
  methods: {
    groupByDia() {
      const reservasAgrupadas = {};

      // Agrupar las reservas por día
      for (const reserva of this.reservas) {
        const dia = reserva.dia;

        if (!reservasAgrupadas[dia]) {
          reservasAgrupadas[dia] = [];
        }

        reservasAgrupadas[dia].push(reserva);
      }

      return reservasAgrupadas;
    },
  },
};
</script>

<style>
/* Estilos CSS si es necesario */
</style>
