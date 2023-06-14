<template>
  <div>
    <h1>Reservas realizadas</h1>
    <ul v-if="reservas.length > 0">
      <li v-for="reserva in reservas" :key="reserva._id">
        <div class="reserva-info">
          <p>Titulo: {{ reserva.titulo }}</p>
          <p>Dia: {{ reserva.dia }}</p>
          <p>Horario: {{ reserva.horario }}</p>
        </div>
        <div class="cancha-info">
          <div class="cancha-image">
            <img :src="reserva.cancha.imagen" :alt="reserva.cancha.titulo" />
          </div>
          <div class="cancha-details">
            <p class="cancha-title">{{ reserva.cancha.titulo }}</p>
            <p class="cancha-type">Tipo: {{ reserva.cancha.tipo }}</p>
          </div>
        </div>
      </li>
    </ul>
    <p v-else>No hay reservas.</p>
  </div>
</template>

<style>
.reserva-info {
  margin-bottom: 10px;
  border-bottom: 1px solid #ccc;
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

<script>
export default {
  data() {
    return {
      reservas: [],
    };
  },
  async mounted() {
    this.reservas = [
      {
        titulo: "Reserva 1",
        dia: "2023-06-15",
        horario: "10:00 AM - 12:00 PM",
        cancha: {
          titulo: "Cancha 2",
          tipo: "Cemento",
          imagen: /*"../assets/cancha_cemento.png"*/ "",
        },
      },
    ];
  },
  methods: {},
};
</script>
