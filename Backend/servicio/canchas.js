import ModelCancha from "../repositorios/repositorio_canchas.js"
import { InvalidCredentialsError } from "../errores.js"

class ServicioCanchas{

    constructor() {
        this.model = new ModelCancha()
      }

    getAll = async()=>{
        try {
            const canchas = await this.model.getAll();
            return canchas
        } catch (error) {
            throw new Error(error);
        }
    }

    crearCancha = async(titulo,tipo,imagen)=>{
        try {
            const cancha = await this.getCancha(titulo)
            if(cancha){
                throw new Error("Esta cancha ya existe")
            }
            const respuesta = await this.model.crearCancha(titulo,tipo,imagen);
            return respuesta
        } catch (error) {
            throw new Error(error);
        }
    }

    getCancha = async(titulo)=>{
        try {
            const cancha = await this.model.getCancha(titulo);
            if(!cancha){
                throw new Error("Esta cancha no existe")
            }
            return cancha
        } catch (error) {
            throw new Error(error);
        }
    }

    //elimina los datos reservados
    modificarCancha = async(reqReserva)=>{
        const cancha = await this.getCancha(reqReserva.titulo);
        try{
            if(!cancha.reservasDisponibles.dias[reqReserva.dia]){
                throw new Error("El dia "+ dia +" no tiene mas reservas")
            }
            if(!cancha.reservasDisponibles.dias[reqReserva.dia].includes(reqReserva.horario)){
                throw new Error("El horario "+ horario +" no se encuentra disponible")
            }
            const canchaModificada = await this.model.modificarCancha(cancha.titulo,reqReserva.dia,reqReserva.horario);
            return canchaModificada.value.titulo
        }catch(error){
            throw new Error(error.message);
        }
    }

    //agrega los datos de reserva eliminada
    agregarDatos = async(reqReserva) => {
        try {
            const respuesta = await this.model.agregarDatos(reqReserva)
            return respuesta
        } catch (error) {
            throw new Error(error);
        }
      }

    agregarArrayDatos = async(arrayReserva)=>{
        try {
            arrayReserva.forEach(r => {
                this.agregarDatos(r);
            });
            return "Reservas agregadas Correctamente"
        } catch (error) {
            throw new Error(error);
        }
    }
}
export default ServicioCanchas
