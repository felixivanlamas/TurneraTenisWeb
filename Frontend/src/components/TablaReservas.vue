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
import { useReservaStore } from "../stores/reservas.js";
import { useUserStore } from "../stores/user";


export default {
  props: {
    canchaSeleccionada: {
      type: Object,
      required: true,
    },
  },

  setup() {
    const reservaStore = useReservaStore();
    const userStore = useUserStore();
    const reservas = computed(() => {
      const tituloCancha = props.canchaSeleccionada.titulo;
      const usuarioActual = userStore.usuario;
      return usuarioActual.reservas.filter(reserva => reserva.titulo === tituloCancha);
    });
    const eliminar_Reserva = (reserva) => {
      const reservaBackend ={titulo:reserva.titulo,dia:reserva.dia,horario:reserva.horario};
      userStore.eliminarReservaAdministradora(reserva.id,reservaBackend);
    }

    return {
      reservas,
      eliminar_Reserva,
    }
  }
};
</script>

<style>
/* Estilos CSS si es necesario */
</style>
