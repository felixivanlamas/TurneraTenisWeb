<script>
import { canchasService } from "../services/canchasService.js"

export default {
  data() {
    return {
        cancha:{},
      vue: this,
    };
  },
  created() {
    this.selectedTipo = ''; // Reiniciar el valor seleccionado al crear el componente
  },
  async mounted(){ 
    try {
        const response = await canchasService.getCancha("648820c2323502717f413afa");
        this.cancha =response.data
      } catch (error) {
        console.log(error.response.data);
        alert(error.response.data);
      }
  },
};
</script>

<template>
  <div class="row">
        <div class="col-sm-6">
          <br><br>
          <div class="card-deck">
              <h5 class="card-title">{{ cancha.titulo }}</h5>
              <img class="card-img-top" :src="cancha.imagen">
              <div class="card-body">
                <h6 class="card-text row">
                <span><b>Tipo de Cancha: </b>{{ cancha.tipo }}</span>
                </h6>
              </div>
          </div>
        </div>
        <div class="col-sm-6">
          <h3>Dia</h3>
          <div v-for="dia in cancha.reservasDisponibles.dias">
            <span>{{ dia }}</span>
          </div>
        </div>
    </div>
</template>