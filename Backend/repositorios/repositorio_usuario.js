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

            await this.usuariosCollection.insertOne(new Usuario(username, email, contrasenia));

            return "Usuario registrado correctamente";
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
            const respuesta = await this.usuariosCollection.updateOne(filter, { $set: { email:email, username:username, contrasenia:contrasenia} });
            if (!respuesta) {
                   throw new Error("Error al editar el usuario");
               }
            return "Usuario editado correctamente";
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

      obtenerUsuario = async (filter) => {
        try {
            const result = await this.usuariosCollection.findOne(filter);
            return result
        } catch (error) {
            return error;
        }
    };
      
    guardarReserva = async (filter, titulo, dia, horario) => {
        try {
          const newReserva = new Reserva(titulo , dia, horario);
          const respuesta = await this.usuariosCollection.updateOne(filter, { $addToSet: { reservas: newReserva } });
          if (!respuesta) {
            throw new Error("Error al guardar la reserva");
          }
          return usuario;
        } catch (error) {
          return error;
        }
      }
}

export default UsuarioRepositorio;

