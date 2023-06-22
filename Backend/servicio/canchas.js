import ModelCancha from "../repositorios/repositorio_canchas.js"
import { InvalidCredentialsError } from "../errores.js"
import { ObjectId } from 'mongodb';

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
            const respuesta = await this.model.crearCancha(titulo,tipo,imagen);
            return respuesta
        } catch (error) {
            throw new Error(error);
        }
    }

    getCancha = async(titulo)=>{
        try {
            const respuesta = await this.model.getCancha(titulo);
            return respuesta
        } catch (error) {
            throw new Error(error);
        }
    }

    //elimina los datos reservados
    modificarCancha = async(titulo,dia,horario)=>{
        const cancha = await this.getCancha(titulo);
        try{
            if(!cancha.reservasDisponibles.dias[dia]){
                throw new InvalidCredentialsError("El dia"+ dia +" no tiene mas reservas")
            }
            if(!cancha.reservasDisponibles.dias[dia].includes(horario)){
                throw new InvalidCredentialsError("El horario"+ horario +" no se encuentra disponible")
            }
            const canchaModificada = await this.model.modificarCancha(cancha.titulo,dia,horario);
            return canchaModificada.value.titulo
        }catch(error){
            throw new Error(error.menssage);
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
                this.model.agregarDatos(r);
            });
            return "Reservas agregadas Correctamente"
        } catch (error) {
            throw new Error(error);
        }
    }
}
export default ServicioCanchas
