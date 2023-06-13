<script>
import { canchasService } from "../services/canchasService.js"

export default {
  data() {
    return {
        selectedTipo:'',
        canchas: [],
      vue: this,
    };
  },
  created() {
    this.selectedTipo = ''; // Reiniciar el valor seleccionado al crear el componente
  },
  async mounted(){ 
    try {
        const response = await canchasService.getAll();
        this.canchas =response.data
      } catch (error) {
        console.log(error.response.data);
        alert(error.response.data);
      }
  },
};
</script>

<template>
  <div>
    <select v-model="selectedTipo">
      <option value='' selected>Filtrar por tipo de Cancha</option>
      <option value="Cemento">Cemento</option>
      <option value="Cesped">Cesped</option>
      <option value="Ladrillo">Ladrillo</option>
    </select>
    <div>
      <div class="row">
        <div class="col-sm-6" v-for="cancha in canchas" :key="cancha.titulo">
          <br><br>
          <div class="card-deck" v-if="selectedTipo === '' || cancha.tipo === selectedTipo">
            <RouterLink class="card" :to="'/canchas/' + cancha._id" style="text-decoration: none; color: black;">
              <img class="card-img-top" :src="cancha.imagen">
              <div class="card-body">
                <h5 class="card-title">{{ cancha.titulo }}</h5>
                <h6 class="card-text row">
                  <span><b>Tipo de Cancha: </b>{{ cancha.tipo }}</span>
                </h6>
              </div>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
