<script>
//import { canchasService } from "../services/canchasService.js"
import {useCanchasStore} from "../stores/canchas.js"
import {useUserStore} from "../stores/user.js"
import {useReservaStore} from "../stores/reserva.js"
import { RouterLink } from "vue-router";

export default {
  data() {
    return {
        selectedTipo:'',
        canchas: [],
        canchaSeleccionada:null,
        reservasDisponibles:[],
        usuario:{},
    };
  },
  created() {
    this.selectedTipo = ''// Reiniciar el valor seleccionado al crear el componente
    this.canchaSeleccionada=null
  },
  async mounted(){ 
    this.fetchCanchas();
    this.getUser();
  },

  methods: {
    async getUser(){
      this.usuario = await useUserStore().getUser();
    },
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
    async guardarDatos(titulo,dia,hora){
      
      await this.getUser();
      if(this.usuario._id!==null){
        //alerta para decirle al user que se loguee
        useReservaStore().guardarDatos(titulo,dia,hora)
        this.$router.push('/reservations')
      }else{
      }
    },

  },
};
</script>

<template>
  <button style="margin-top: 20px;" class="btn btn-secondary" @click="canchaSeleccionada = null" v-if="canchaSeleccionada!=null">Volver</button>
    <select style="margin-top: 20px;" class="btn btn-info" v-model="selectedTipo" v-if="canchaSeleccionada==null">
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
              <img class="card-img-top w-100 w" style="width: 640px; height: 427px;" :src="cancha.imagen" @click="seleccionarCancha(cancha)">
              <div class="card-body">
                <h5 class="card-title">{{ cancha.titulo }}</h5>
                <h6 class="card-text row">
                  <span><b>Tipo de Cancha: </b>{{ cancha.tipo }}</span>
                </h6>
                <h6 class="card-text row" v-if="!canchaSeleccionada"> </h6>
              </div>
          </div>
        </div>

        <table v-show="canchaSeleccionada!=null" class="table col-sm-6">
          <thead>
            <tr>
              <th class="text-center">Turnos Disponibles</th>
            </tr>
          </thead>
          <tbody class="text-justify" v-for="dia in this.reservasDisponibles">
            <tr>
              <th>{{ dia.dia }}:
              <div class="btn-group" v-for="hora in dia.horarios">
                <div class="btn btn-primary" @click="guardarDatos(canchaSeleccionada.titulo,dia.dia,hora)">{{ hora }}</div></div>
              </th>
            </tr>
          </tbody>
        </table>
      </div>


    <div>
      <table style="margin-top: 20px;" v-show="canchaSeleccionada!=null" class="table">
        <thead>
          <tr>
            <th class="text-center">Turnos Disponibles</th>
          </tr>
        </thead>
        <tbody class="text-justify" v-for="dia in this.reservasDisponibles">
          <tr>
            <th>{{ dia.dia }}:
            <div style="margin: 0px 2px;" class="btn-group btn-outline-primary" v-for="hora in dia.horarios">
              <RouterLink to="/reservations"><div class="btn btn-info" @click="guardarDatos(canchaSeleccionada.titulo,dia.dia,hora)">{{ hora }}</div></RouterLink>
            </div>
            </th>
          </tr>
        </tbody>
      </table>
    </div>

  </template>