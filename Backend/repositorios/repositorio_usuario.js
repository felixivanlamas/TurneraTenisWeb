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

    async registro(email, username, contrasenia) {
        try {
            const existingUser = await this.usuariosCollection.findOne({ email: email });
            if (existingUser) {
                throw new Error(`El correo ${email} ya fue ingresado`);
            }
            const newUser = new Usuario(username, email, contrasenia);
            await this.usuariosCollection.insertOne(newUser);
            return newUser;
        } catch (error) {
            throw new Error("Error al registrar usuario: " + error);
        }
    }


    async login(email) {
        try {
            const usuario = await this.usuariosCollection.findOne({ email: email });
            if (!usuario) {
                throw new Error(`El ${email} no está registrado`);
            }
            return usuario;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async editarUsuario(filter, conditions) {
      const datosAEditar = { $set: { } };
      const usuarioViejo = await this.obtenerUsuario(filter);
      
      datosAEditar.$set.email = conditions.email ?? usuarioViejo.email;
      datosAEditar.$set.contrasenia = conditions.contrasenia ?? usuarioViejo.contrasenia;
      datosAEditar.$set.username = conditions.username ?? usuarioViejo.username;
      
      const usuarioEditado = await this.usuariosCollection.findOneAndUpdate(filter, datosAEditar, { returnDocument: "after" });
      if (!usuarioEditado) {
        throw new Error("Error al editar el usuario");
      }
      return usuarioEditado.value;
    }
    


/*    async editarUsuario(filter, datos) {
      const datosAEditar = {};
      const usuarioViejo = this.obtenerUsuario(filter);
      if (datos.email !== undefined) {
        if(datos.contrasenia !== undefined){
          if (datos.username !== undefined) {
            datosAEditar.$set = { email: datos.email, contrasenia: datos.contrasenia , username: datos.username };
          }else{
            datosAEditar.$set = { email: datos.email, contrasenia: datos.contrasenia , username: usuarioViejo.username};
          }
        }else if (datos.username !== undefined) {
          datosAEditar.$set = { email: datos.email, username: datos.username,contrasenia: usuarioViejo.contrasenia };
        }else{
          datosAEditar.$set = { email: datos.email, contrasenia: usuarioViejo.contrasenia , username: usuarioViejo.username};
        }
      }else {
        if(datos.contrasenia !== undefined){
          if (datos.username !== undefined) {
            datosAEditar.$set = { email: usuarioViejo.email, contrasenia: datos.contrasenia , username: datos.username };
          }else{
            datosAEditar.$set = { email: usuarioViejo.email, contrasenia: datos.contrasenia , username: usuarioViejo.username};
          }
        }else if (datos.username !== undefined) {
          datosAEditar.$set = {  email: usuarioViejo.email, username: usuarioViejo.username,contrasenia: datos.contrasenia };
        }else{
          datosAEditar.$set = {  email: usuarioViejo.email, username: usuarioViejo.username,contrasenia: usuarioViejo.contrasenia };
        }

      }
        
        const usuarioEditado = await this.usuariosCollection.findOneAndUpdate(filter, datosAEditar, { returnDocument: "after" });
        if (!usuarioEditado) {
            throw new Error("Error al editar el usuario");
        }
        return usuarioEditado.value;   
      }*/
  
  
  

    
    async eliminarCuenta(filter) {
        try {
            const usuarioEliminado = await this.usuariosCollection.findOneAndDelete(filter);
            if (!usuarioEliminado) {
                throw new Error("Usuario no encontrado")
            }
            console.log("La cuenta con el email " + usuarioEliminado.value.email +" ha sido borrada correctamente");
            return usuarioEliminado.value
        }catch (error) {
            throw new Error(error.message);
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
            return error;
        }
    };
      
    async guardarReserva(reqReserva) {
        const idUsuario = new ObjectId(reqReserva.id);
        const newReserva = new Reserva(reqReserva.titulo, reqReserva.dia,reqReserva.horario);
        try {
          const usuario = await this.usuariosCollection.findOneAndUpdate(
            { _id: idUsuario },
            { $push: { reservas: newReserva } },
            { returnDocument: "after" }
          );
      
          if (usuario.value==null) {
            throw new Error("El usuario es null");
          }
          return usuario;
        } catch (error) {
          console.error("Error al guardar la reserva:", error);
          throw error;
        }
      }

      async eliminarReserva(filter, reqReserva) {
        const reservaAEliminar = new Reserva(reqReserva.titulo, reqReserva.dia, reqReserva.horario);
        try {
          const usuario = await this.usuariosCollection.findOneAndUpdate(
            filter,
            { $pull: { reservas: reservaAEliminar } },
            { returnDocument: "after" }
          );
          if (!usuario) {
            throw new Error("Reserva no encontrada");
          }
          return usuario.value;
        } catch (error) {
          throw new Error(error.message);
        }
      }
      
      
}

export default UsuarioRepositorio;

