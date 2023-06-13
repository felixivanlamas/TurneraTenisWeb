import ConexionMongo from './conexionMongoDb.js';

class UsuarioRepositorio {
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
            const filtro = {_id: id}
            const respuesta = await this.canchasCollection.find(filtro);
            return respuesta;
        } catch (error) {
            throw new Error("Error al obtener la cancha: " + id) 
        }
    }
}


export default UsuarioRepositorio;

