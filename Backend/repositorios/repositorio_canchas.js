import ConexionMongo from './conexionMongoDb.js';


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
          console.log('Conexión existosa a MongoDB2');
        } else {
          // Si no existe una instancia, crear una nueva
          const nuevaConexionMongo = new ConexionMongo();
          await nuevaConexionMongo.conectar();
          this.canchasCollection = nuevaConexionMongo.canchasColeccion();
          console.log('Conexión existosa a MongoDB4');
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

    async getCancha(titulo){
        try {
            const cancha = await this.canchasCollection.findOne({titulo: titulo});
            if (!cancha) {
                throw new Error("No existe una cancha con ese titulo")
            }
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
          console.error('Error al actualizar la Cancha:', error);
          throw error;
        }
      }

      async agregarDatos(datos) {
        try {
          const { titulo, dia, horario } = datos;
      
          const nuevosDatos = {
            $addToSet: {
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
          console.error('Error al agregar los datos:', error);
          throw error;
        }
      }
      
      
}

export default CanchaRepositorio;

