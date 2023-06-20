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
            const conexionMongo = new ConexionMongo();
            await conexionMongo.conectar();
            this.usuariosCollection = await conexionMongo.usuariosColeccion()
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

            if (!email || !username || !contrasenia) {
                throw new Error('El email, nombre y pass son campos requeridos');
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

    async editarUsuario(filter, email, username, contrasenia) {
            const usuario = await this.obtenerUsuario(filter)
            if(!usuario) {
                throw new Error("El usuario no existe");
            }
            const usuarioEditado= null;

                if(username != ''){
                 usuarioEditado = await this.usuariosCollection.findOneAndUpdate(filter, { $set: {username:username} }, { returnDocument: "after" });
              } 
                else if(email != ''){
                 usuarioEditado = await this.usuariosCollection.findOneAndUpdate(filter, { $set: {email:email} }, { returnDocument: "after" });
              } else {
                 usuarioEditado = await this.usuariosCollection.findOneAndUpdate(filter, { $set: {contrasenia:contrasenia} }, { returnDocument: "after" });
              }
      
            if (!usuarioEditado) {
                   throw new Error("Error al editar el usuario");
               }
            return usuarioEditado;
        }

    
    async eliminarCuenta(filter) {
        try {
            const usuarioEliminado = await this.usuariosCollection.findOneAndDelete(filter);
            if (!usuarioEliminado) {
                throw new Error("Usuario no encontrado")
            }
            console.log("La cuenta con el email " + usuarioEliminado.value.email +" ha sido borrada correctamente");
            return
        }catch (error) {
            throw new Error(error.message);
        }
    };

      getAll = async () => {
        try {
          const result = await this.usuariosCollection.find();
          return result
        } catch (error) {
          throw new Error(error);
        }
      } 

      obtenerUsuario = async (idUsuario) => {
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
      
}

export default UsuarioRepositorio;

