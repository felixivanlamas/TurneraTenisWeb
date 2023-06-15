//npm run dev para front y node main.js para back

<template>
  <div>
    <h1 class="titulo-seccion">Reservas realizadas</h1>
    <ul v-if="reservas.length > 0">
      <li v-for="reserva in reservas" :key="reserva._id">
        <div class="reserva">
          <div class="reserva-info">
            <p> Reserva </p>
            <p>Dia: {{ reserva.dia }}</p>
            <p>Horario: {{ reserva.horario }}</p>
          </div>
          <div class="cancha-info">
            <div class="cancha-image">
              <img
                :src="getCanchaImagen(reserva.cancha.tipo)"
                :alt="getCanchaTitulo(reserva.cancha.tipo)"
              />
            </div>
            <div class="cancha-details">
              <p class="cancha-title">
                {{ getCanchaTitulo(reserva.cancha.tipo) }}
              </p>
              <p class="cancha-type">Tipo: {{ reserva.cancha.tipo }}</p>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <p v-else>No hay reservas.</p>
  </div>
</template>

<script>
import { canchasService } from "../services/canchasService.js";

export default {
  data() {
    return {
      reservas: [],
      canchas: [],
    };
  },
  async mounted() {
    try {
      const response = await canchasService.getAll();
      this.canchas = response.data;
    } catch (error) {
      console.log(error.response.data);
      alert(error.response.data);
    }
    this.reservas = [
      {
        titulo: "Reserva 1",
        dia: "Lunes",
        horario: "12:00",
        cancha: {
          titulo: "Cancha 2",
          tipo: "Cesped",
        },
      },
      {
        titulo: "Reserva 2",
        dia: "Martes",
        horario: "22:00",
        cancha: {
          titulo: "Cancha 2",
          tipo: "Ladrillo",
        },
      },
    ];
  },
  methods: {
    getCanchaByTipo(tipo) {
      return this.canchas.find((cancha) => cancha.tipo === tipo);
    },
    getCanchaImagen(tipo) {
      const cancha = this.getCanchaByTipo(tipo);
      return cancha ? cancha.imagen : "";
    },
    getCanchaTitulo(tipo) {
      const cancha = this.getCanchaByTipo(tipo);
      return cancha ? cancha.titulo : "";
    },
  },
};
</script>

<style>
.reserva {
  border-bottom: #888 1px solid;
  margin-bottom: 50px;
}
.titulo-seccion {
  margin-bottom: 50px;
}
.reserva-info {
  margin-bottom: 10px;
  padding-bottom: 10px;
}

.cancha-info {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.cancha-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
}

.cancha-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cancha-details {
  flex: 1;
}

.cancha-title {
  font-weight: bold;
  font-size: 18px;
}

.cancha-type {
  font-size: 14px;
  color: #888;
}
</style>
