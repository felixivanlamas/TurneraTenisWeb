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
        <template>
          <span>HOLA</span>
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
  },
};
</script>

<style>
/* Estilos CSS si es necesario */
</style>
