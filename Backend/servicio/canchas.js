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

    getCancha = async(id)=>{
        try {
            const filter={_id:new ObjectId(id)}
            const respuesta = await this.model.getCancha(filter)
            return respuesta
        } catch (error) {
            throw new Error(error);
        }
    }

    modificarCancha = async(id,dia,horario)=>{
        try{
            const cancha = await this.getCancha(id);
            if(!cancha){
                throw new InvalidCredentialsError("Cancha no encontrada")
            }
            if(!cancha.reservasDisponibles.dias.hasOwnProperty(dia)){
                throw new InvalidCredentialsError("El dia"+ dia +" no se encuentra disponible")
            }
            if(!cancha.reservasDisponibles.dias[dia].includes(horario)){
                throw new InvalidCredentialsError("El horario"+ horario +" no se encuentra disponible")
            }
            const filter= {_id:new ObjectId(id)}
            const canchaModificada = await this.model.modificarCancha(filter,dia,horario);
            return canchaModificada
        }catch(error){
            throw new Error(error);
        }
    }
}
export default ServicioCanchas
