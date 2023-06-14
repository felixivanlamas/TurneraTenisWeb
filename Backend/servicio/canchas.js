import ModelCancha from "../repositorios/repositorio_canchas.js"

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
            const cancha = await this.model.getCancha(id);
            return cancha
        } catch (error) {
            throw new Error(error);
        }
    }

    modificarCancha = async(titulo,dia,horario)=>{
        try{
            const respuesta = await this.model.modificarCancha(titulo,dia,horario);
            return respuesta
        }catch(error){
            throw new Error(error);
        }
    }
}
export default ServicioCanchas
