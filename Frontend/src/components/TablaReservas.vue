<template>
  <div>
    <h3>Reservas de {{ canchaSeleccionada.titulo }}</h3>
    <table class="table">
      <thead>
        <tr>
          <th>Día</th>
          <th>Usuarios</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="reservaDia in reservasPorDia" :key="reservaDia.dia">
          <td>{{ reservaDia.dia }}</td>
          <td>
            <ul>
              <li v-for="reserva in reservaDia.reservas" :key="reserva.username">
                {{ reserva.username }} - {{ reserva.horario }}
              </li>
            </ul>
          </td>
        </tr>
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
