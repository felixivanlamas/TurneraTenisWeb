import ConexionMongo from './conexionMongoDb.js';
import Cancha from '../clases/cancha.js'

class CanchaRepositorio {
    constructor() {
        this.canchasCollection = null;
        this.init();
    }
    async init() {
      try {
        const conexionMongo = ConexionMongo.instance; // Obtener la instancia existente
        if (conexionMongo) {
          // Verificar si ya existe una instancia de conexión
          this.canchasCollection = conexionMongo.canchasColeccion();
        } else {
          // Si no existe una instancia, crear una nueva
          const nuevaConexionMongo = new ConexionMongo();
          await nuevaConexionMongo.conectar();
          this.canchasCollection = nuevaConexionMongo.canchasColeccion();
        }
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
            const newCancha = new Cancha(titulo,tipo,imagen)
            const canchaCreada= await this.canchasCollection.insertOne(newCancha)
            return canchaCreada
        } catch(error){
            throw new Error("Error al crear la cancha: " + error)
        }
    }

    async getCancha(titulo){
        try {
            const cancha = await this.canchasCollection.findOne({titulo: titulo});
            return cancha;
        } catch (error) {
            throw new Error("Error al obtener la cancha: " + error) 
        }
    }
   
    async modificarCancha(titulo, dia, horario) {
        //modificacion arreglada
        try {
          const nuevosDatos = {
            $pull: {
              [`reservasDisponibles.dias.${dia}`]: horario
            }
          };
      
          const opciones = { returnDocument: "after" };
      
          return await this.canchasCollection.findOneAndUpdate(
            { titulo: titulo },
            nuevosDatos,
            opciones
          );
        } catch (error) {
          throw new Error("Error al modificar la cancha: " + error);
        }
      }

      async agregarDatos(reqReserva) {
        try {
          const nuevosDatos = {
            $push: {
              [`reservasDisponibles.dias.${reqReserva.dia}`]: reqReserva.horario
            }
          };
          const opciones = { returnDocument: "after" };
          const canchasActualizada = await this.canchasCollection.findOneAndUpdate(
            { titulo: reqReserva.titulo },
            nuevosDatos,
            opciones
            );
          return canchasActualizada.value
        } catch (error) {
          console.error('Error al agregar los datos:', error);
          throw error;
        }
      }
      
      
}

export default CanchaRepositorio;

