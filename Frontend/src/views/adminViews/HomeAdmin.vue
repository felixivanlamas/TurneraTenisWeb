<template>
  <div>
    <button style="margin-top: 20px;" class="btn btn-secondary" @click="canchaSeleccionada = null" v-if="canchaSeleccionada != null">Volver</button>
    <select style="margin-top: 20px;" class="btn btn-info" v-model="selectedTipo" v-if="canchaSeleccionada == null">
      <option value="" selected>Filtrar por tipo de Cancha</option>
      <option value="Cemento">Cemento</option>
      <option value="Cesped">Cesped</option>
      <option value="Ladrillo">Ladrillo</option>
    </select>
    <div class="row">
      <div class="col-sm-6" v-for="cancha in canchas" :key="cancha.titulo" v-show="!canchaSeleccionada || cancha === canchaSeleccionada">
        <br>
        <div class="card item-cancha" v-if="selectedTipo === '' || cancha.tipo === selectedTipo">
          <div class="card-lg border-primary" style="text-decoration: none; color: black;"></div>
          <img class="card-img-top w-100 w" style="width: 640px; height: 427px;" :src="cancha.imagen" @click="mostrarReservas(cancha)">
          <div class="card-body row">
            <h5 class="card-title col-sm-6">{{ cancha.titulo }}</h5>
            <h6 class="card-text row col-sm-6">
              <span><b>Tipo de Cancha: </b>{{ cancha.tipo }}</span>
            </h6>
          </div>
        </div>
      </div>

      <TablaReservas
        v-if="canchaSeleccionada"
        :canchaSeleccionada="canchaSeleccionada"
        :reservas="reservasCanchaOrdenadas"
      />
    </div>
  </div>
</template>

<script>
import { useCanchasStore } from "../../stores/canchas.js";
import { useUserStore } from "../../stores/user.js";
import TablaReservas from "../../components/TablaReservas.vue";

export default {
  data() {
    return {
      selectedTipo: "",
      canchas: [],
      canchaSeleccionada: null,
      reservas: [],
      reservasCanchaOrdenadas: [],
    };
  },
  created() {
    this.selectedTipo = ""; // Reiniciar el valor seleccionado al crear el componente
    this.canchaSeleccionada = null;
  },
  async mounted() {
    await this.fetchCanchas();
    await this.getAll();
  },
  components: {
    TablaReservas,
  },
  methods: {
    async getAll() {
      this.usuarios = await useUserStore().getAll();
    },
    async fetchCanchas() {
      const canchasStore = useCanchasStore();
      try {
        await canchasStore.fetchCanchas();
        this.canchas = canchasStore.canchas;
        this.canchas = this.ordenarCanchas(this.canchas);
      } catch (error) {
        console.error(error);
      }
    },
    async obtenerReservas() {
      this.reservas = [];
      for (const usuario of this.usuarios) {
        for (const r of usuario.reservas) {
          const reserva = {
            username: usuario.username,
            titulo: r.titulo,
            dia: r.dia,
            horario: r.horario,
          };
          this.reservas.push(reserva);
        }
      }
    },
    mostrarReservas(cancha) {
      this.obtenerReservas();
      this.canchaSeleccionada = cancha;
      const reservasCancha = this.reservas.filter((r) => r.titulo === cancha.titulo);
      this.reservasCanchaOrdenadas = this.ordenarReservas(reservasCancha);
    },
    ordenarReservas(reservas) {
      return reservas.sort((a, b) => {
        const diaA = a.dia;
        const diaB = b.dia;
        const horarioA = a.horario;
        const horarioB = b.horario;

        // Comparar por día
        if (diaA !== diaB) {
          return diaA.localeCompare(diaB);
        }

        // Si los días son iguales, comparar por horario
        return horarioA.localeCompare(horarioB);
      });
    },
    ordenarCanchas(canchas) {
      for (const cancha of canchas) {
        for (const dia in cancha.reservasDisponibles.dias) {
          const horariosDia = cancha.reservasDisponibles.dias[dia];
          horariosDia.sort();
        }
      }
      return canchas;
    },
  },
};
</script>

<style>
.item-cancha {
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  overflow: hidden;
  transition: box-shadow 0.3s;
}

.item-cancha:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.card-title {
  font-size: 24px;
  font-weight: bold;
}

.card-text {
  font-size: 16px;
}
</style>
