<script>
import { useUserStore } from "../../stores/user.js";

export default {
    data() {
        return {
            usuario:{},
        }
        
    },
    async mounted() {
        this.usuario = await useUserStore().getUser();
    },

    methods:{
        async pagarReservas(){
        const res = await useUserStore().borrarCuenta();
        if (res) {
          useUserStore().logout();
          this.$router.push("/")
        }
      
    }
    }



}  
</script>

<template>
</template>