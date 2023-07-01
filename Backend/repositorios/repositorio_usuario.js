import { ObjectId } from 'mongodb';
import Reserva from '../clases/reserva.js';
import Usuario from '../clases/usuario.js';
import ConexionMongo from './conexionMongoDb.js';

class UsuarioRepositorio {
  constructor() {
    this.usuariosCollection = null;
    this.init();
  }

  async init() {
    try {
      const conexionMongo = ConexionMongo.instance; // Obtener la instancia existente
      if (conexionMongo) {
        // Verificar si ya existe una instancia de conexión
        this.usuariosCollection = conexionMongo.usuariosColeccion();
      } else {
        // Si no existe una instancia, crear una nueva
        const nuevaConexionMongo = new ConexionMongo();
        await nuevaConexionMongo.conectar();
        this.usuariosCollection = nuevaConexionMongo.usuariosColeccion();
      }
    } catch (error) {
      console.error(error);
    }
  }

    async registro(usuario) {
        try {
            const newUser = new Usuario(usuario.username, usuario.email, usuario.contrasenia);
            await this.usuariosCollection.insertOne(newUser);
            return newUser;
        } catch (error) {
            throw new Error("Error al registrar usuario: " + error);
        }
    }

    async buscarEmail(email){
        return await this.usuariosCollection.findOne({ email: email });
    }


    async buscarUsername(username){
      return await this.usuariosCollection.findOne({ username: username });
    }

    async editarUsuario(usuarioViejo, datos, filter) {
      try {
        const datosAEditar = { $set: { } };      
        datosAEditar.$set.email = datos.email ?? usuarioViejo.email;
        datosAEditar.$set.contrasenia = datos.contrasenia ?? usuarioViejo.contrasenia;
        datosAEditar.$set.username = datos.username ?? usuarioViejo.username;
        const usuarioEditado = await this.usuariosCollection.findOneAndUpdate(filter, datosAEditar, { returnDocument: "after" });
        return usuarioEditado.value;
      } catch (error) {
        throw new Error("Error al editar usuario: " + error);
      }
    }
    
    async eliminarCuenta(filter) {
        try {
            const usuarioEliminado = await this.usuariosCollection.findOneAndDelete(filter);
            return usuarioEliminado.value
        }catch (error) {
            throw new Error("Error al eliminar usuario: " + error);
        }
    };

    async getAll(){
        try {
          const result = await this.usuariosCollection.find().toArray();
          return result
        } catch (error) {
          throw new Error(error);
        }
      } 

      async obtenerUsuario(idUsuario) {
        try {
            const usuario = await this.usuariosCollection.findOne(idUsuario);
            return usuario
        } catch (error) {
          throw new Error("Error al obtener usuario: " + error);
        }
    };
      
    async guardarReserva(id,reqReserva) {
        const idUsuario = new ObjectId(id);
        const newReserva = new Reserva(reqReserva.titulo, reqReserva.dia,reqReserva.horario);
        try {
          const usuario = await this.usuariosCollection.findOneAndUpdate(
            { _id: idUsuario },
            { $push: { reservas: newReserva } },
            { returnDocument: "after" }
          );
          return usuario;
        } catch (error) {
          throw new Error("Error al reservar: " + error);
        }
      }

      async eliminarReserva(filter, reqReserva) {
        const reservaAEliminar = new Reserva(reqReserva.titulo, reqReserva.dia, reqReserva.horario);
        try {
          const usuario = await this.usuariosCollection.findOneAndUpdate(
            {_id: filter},
            { $pull: { reservas: reservaAEliminar } },
            { returnDocument: "after" }
          );
          return usuario.value;
        } catch (error) {
          throw new Error("Error al eliminar reserva: " + error);
        }
      }
      
      async multar(id) {
        await this.usuariosCollection.findOneAndUpdate(
          { _id: id },
          { $inc: { debe: 2000 } },
          { returnDocument: "after" }
        );
        return
      }
      
}

export default UsuarioRepositorio;

