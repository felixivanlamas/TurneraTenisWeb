import ConexionMongo from './conexionMongoDb.js';
import {InvalidCredentialsError} from "../errores.js"
import { ObjectId } from 'mongodb';

class CanchaRepositorio {
    constructor() {
        this.canchasCollection = null;
        this.init();
    }

    async init() {
        try {
            const conexionMongo = new ConexionMongo();
            await conexionMongo.conectar();
            this.canchasCollection = await conexionMongo.canchasColeccion()
        } catch (error) {
            console.error(error);
        }
    }

    async getAll(){
        try {
            const canchas = await this.canchasCollection.find().toArray();
            return canchas;
        } catch (error) {
            throw new Error("No hay canchas para mostrar: "  + error);
        }
    }

    async crearCancha(titulo,tipo,imagen){
        try{
            const existingCancha = await this.canchasCollection.findOne({titulo: titulo})
            if (existingCancha) {
                throw new Error(`El correo ${titulo} ya fue ingresado`);
            }
            const newCancha = {
                titulo: titulo,
                tipo: tipo,
                imagen: imagen,
            }
            await this.canchasCollection.insertOne(newCancha)
            return "Cancha creada exitosamente"
        } catch(error){
            throw new Error("Error al crear la cancha: " + error)
        }
    }

    async getCancha(id){
        try {
            const idCancha = new ObjectId(id)
            const cancha = await this.canchasCollection.findOne({_id:idCancha});
            return cancha;
        } catch (error) {
            throw new Error("Error al obtener la cancha: " + titulo) 
        }
    }
    //MODIFICAR GETCANCHA POR ID Y EL BODY DEL REQ
    async modificarCancha (titulo,dia,horario) {
        try {
          const cancha = await this.getCancha(titulo);
          if (!cancha.reservasDisponibles.dias.hasOwnProperty(dia)) {
            throw new InvalidCredentialsError("No hay reservas disponible para el dia : "+ dia)
          }
          const horariosDisponibles = cancha.reservasDisponibles.dias[dia];
          if (horariosDisponibles.includes({horario:horario})) {
            throw new InvalidCredentialsError("No hay horarios disponible para el dia : "+ dia)
          }
          
          const nuevosDatos = {
            $pull: {
              [`reservasDisponibles.dias.${dia}`]: horario
            }
          };
    
        await this.canchasCollection.updateOne({ _id: cancha._id }, nuevosDatos);
        const respuesta = {titulo,dia,horario}
        return respuesta
         } catch (error) {
            console.error('Error al actualizar la Cancha:', error);    } 
      };
}

export default CanchaRepositorio;

