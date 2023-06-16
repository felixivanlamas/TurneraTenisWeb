<script>
//import { canchasService } from "../services/canchasService.js"
import {useCanchasStore} from "../stores/canchas.js"

export default {
  data() {
    return {
        selectedTipo:'',
        canchas: [],
        canchaSeleccionada:null,
        reservasDisponibles:[],
        selectedDia:"",
        selectedHorario:"",

        vue: this,
    };
  },
  created() {
    this.selectedTipo = ''// Reiniciar el valor seleccionado al crear el componente
    this.canchaSeleccionada=null
  },
  async mounted(){ 
    this.fetchCanchas();
  },

  methods: {
    fetchCanchas() {
      const canchasStore = useCanchasStore();
      canchasStore.fetchCanchas()
        .then(() => {
          this.canchas = canchasStore.canchas;
        })
        .catch(error => {
          console.error(error);
        });
    },
    seleccionarCancha(cancha) {
      this.reservasDisponibles.splice(0)
      for (const dia in cancha.reservasDisponibles.dias ) {
      const horariosDia = cancha.reservasDisponibles.dias[dia];
      this.reservasDisponibles.push({ dia, horarios: horariosDia });
      }

      this.canchaSeleccionada = cancha;
    },
    guardarDatos(dia,hora){
      if(confirmar(da,ihora)){
        this.selectedDia = dia;
        this.selectedHorario = hora;  
      }

    },

  },
  confirmar(dia,hora){
    var retVal = confirm(`¿Esta seguro que quiere hacer la reserva el dia {dia} en el horario de las {hora}?`);
    if( retVal == true ){
        return true;
    }else{
        return false;
    }
}
  
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
              <img class="card-img-top w-100 " :src="cancha.imagen" @click="seleccionarCancha(cancha)">
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
      <table v-show="canchaSeleccionada!=null" class="table">
        <thead>
          <tr>
            <th class="text-center">Turnos Disponibles</th>
          </tr>
        </thead>
        <tbody class="text-justify" v-for="dia in this.reservasDisponibles">
          <tr>
            <th>{{ dia.dia }}:
            <div class="btn-group" v-for="hora in dia.horarios">
              <div class="btn btn-primary" @click="guardarDatos(dia.dia,hora)">{{ hora }}</div></div>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
<!--   
  <div v-show="canchaSeleccionada!=null" >
    <div>
      <h3>Día:</h3>
      <select class="form-select" v-model="selectedDia">
      <option disabled selected>Selecciona un día</option>
      <option v-for="(value, dia) in this.reservasDisponibles.dias" :value="dia">{{value}}</option>
    </select>
    </div>
  </div> -->


  </template>