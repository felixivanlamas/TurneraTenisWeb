<script>
import { canchasService } from "../services/canchasService.js"
import { userService } from "../services/userService";

export default {
  data() {
    return {
        selectedTipo:'',
        canchas: [],
        canchaSeleccionada:null,
        horarios: [],
        seleccionCancha: null,
        vue: this,
    };
  },
  created() {
    this.selectedTipo = ''; // Reiniciar el valor seleccionado al crear el componente
  },
  async mounted(){ 
    try {
        const user = await userService.getUser();
        const canchas = await canchasService.getAll();
        this.canchas =canchas.data
      } catch (error) {
        console.log(error.canchas.data);
        alert(error.canchas.data);
      }
  },
  methods: {
    obtenerDias(cancha) {
  
  for (const dia in cancha.reservasDisponibles.dias) {
    const horariosDia = cancha.reservasDisponibles.dias[dia];
    this.horarios.push({ dia, horarios: horariosDia });
  }
  
console.log(this.horarios)
      }
    },
  
};
</script>

<template>
  <button  @click="canchaSeleccionada = null" v-if="canchaSeleccionada!=null">Volver</button>
    <select v-model="selectedTipo" v-if="canchaSeleccionada==null">
      <option value='' selected>Filtrar por tipo de Cancha</option>
      <option value="Cemento">Cemento</option>
      <option value="Cesped">Cesped</option>
      <option value="Ladrillo">Ladrillo</option>
    </select>
      <div class="row">
        <div class="col-sm-6" v-for="cancha in canchas" :key="cancha.titulo" v-show="!canchaSeleccionada || cancha === canchaSeleccionada">
          <br>
          <div class="card" v-if="selectedTipo === '' || cancha.tipo === selectedTipo">
            <div class="card-lg border-primary" style="text-decoration: none; color: black;" ></div>
              <img class="card-img-top w-100 " :src="cancha.imagen" @click="obtenerDias(cancha)">
              <div class="card-body">
                <h5 class="card-title">{{ cancha.titulo }}</h5>
                <h6 class="card-text row">
                  <span><b>Tipo de Cancha: </b>{{ cancha.tipo }}</span>
                </h6>
                <h6 class="card-text row" v-if="!canchaSeleccionada"> </h6>
              </div>
          </div>
        </div>
      </div>


    <div>
    <table class="table">
      <thead>
        <tr>
          <th>Día</th>
          <th>Horarios</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="dia in this.horarios">
          <td>{{ dia.dia }}</td>
                <tr v-for="hora in dia.horarios">
                   <td>{{ hora }}</td>          
               </tr>
        </tr>
      </tbody>
    </table>
  </div>


</template>
