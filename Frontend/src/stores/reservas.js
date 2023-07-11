import { defineStore } from "pinia";
import { userService } from "../services/userService";

export const useReservaStore =  defineStore('reservas',{
    state: () => ({
        reservas: [],
    }),
    actions:{
        async getUsers(){
            try {
                const response = await userService.getAll();
                for (const usuario of response.data) {
                    if (!usuario.email.includes('@admin')) {
                        for (const r of usuario.reservas) {
                            let reserva={id:usuario._id, username:usuario.username,titulo:r.titulo,dia:r.dia,horario:r.horario}
                            this.reservas.push(reserva)
                        }
                    }
                }
            } catch (error) {
                throw error
            }
        },

    },
    getters:{
        getReservas(){
            return this.reservas
        }
    }

})