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
            // const newUsuario = {
            //     username: username,
            //     email: email,
            //     contrasenia: contrasenia,
            //     reservas: []
            // };

            await this.usuariosCollection.insertOne(new Usuario(username, email, contrasenia));

            return "Usuario registrado correctamente";
        } catch (error) {
            throw new Error("Error al registrar usuario: " + error);
        }
    }


    async login(email) {
        try {
            const user = await this.usuariosCollection.findOne({ email: email });
            console.log(user);
            if (!user) {
                throw new Error(`El ${email} no está registrado`);
            }
            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    }


    async confirmarRegistro(email) {
        try {
            const updateFilter = { email: email };
            const updateData = { $set: { registro: 1 } };

            await this.usuariosCollection.updateOne(updateFilter, updateData);

            const usuario = await this.usuariosCollection.findOne({ email: email });

            return usuario;
        } catch (error) {
            console.log(error);
            throw new Error("Error en la confirmación");
        }
    };


    async editarUsuario(email, username, contrasenia) {
        try {
            const usuario = await this.usuariosCollection.findOne({ email: email });
            if (usuario) {
                await this.usuariosCollection.updateOne({ email: email }, { $set: { username: username, contrasenia: contrasenia } });
                console.log("Usuario editado correctamente");
                return
            }
            else {
                console.log("No existe un usuario con ese mail");
            }
        } catch (error) {
            console.log(error);
            throw new Error("Error al editar al usuario: " + error.message);
        }
    }

    async cambiarEmail(email, nuevoEmail) {
        try {
            await this.usuariosCollection.updateOne({ email: email }, { $set: { email: nuevoEmail } });
            return;
        } catch (error) {
            throw new Error(error);
        }
    }


    async eliminarCuenta(email) {
        try {
            const usuario = await this.usuariosCollection.findOne({ email });
            if (usuario) {
                await this.usuariosCollection.deleteOne({ email });
                console.log(`La cuenta con el email ${email} ha sido borrada correctamente`);
            } else {
                throw new Error("Usuario no encontrado");
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    agregarHuella = async (email, huella) => {
        try {
          const filter = { email: email };
          const update = { $set: { huella: huella } };
          await this.usuariosCollection.updateOne(filter, update);
        } catch (error) {
          console.log(error);
        }
      }


      logout = async (email) => {
        try {
          const huella = '';
          const filter = { email: email };
          const update = { $set: { huella: huella } };
          
          await this.usuariosCollection.updateOne(filter, update);
          console.log("Logout del email: " + email);
        } catch (error) {
          console.log(error);
          throw new Error("Error al cerrar sesión del usuario: " + error.message);
        }
      }


      devolverUsuario = async (huella) => {
        try {
          const filter = { huella: huella };
          const row = await this.usuariosCollection.findOne(filter);
      
          if (!row) {
            throw new Error("Ningún usuario tiene la huella guardada");
          }
      
          return row;
        } catch (error) {
          throw new Error(error.message);
        }
      }
      
      getAll = async () => {
        try {
          const result = await this.usuariosCollection.find();
          return result
        } catch (error) {
          throw new Error(error);
        }
      } 

      obtenerUsuario = async (id) => {
        try {
            const result = await this.usuariosCollection.findOne({ _id: id });
            if (!result) {
                throw new Error(`No existe el usuario con el id: ${id}`);
            }
            return result
        } catch (error) {
            return error;
        }
    };
      
    guardarReserva = async (reqReserva) => {
        try {
          const idUsuario = new ObjectId(reqReserva.idUsuario);
          const usuario = await this.usuariosCollection.findOne({ _id:idUsuario });
          if(!usuario) {
            throw new Error(`El usuario con el id: ${idUsuario} no existe`);
          }
          const newReserva = new Reserva(reqReserva.titulo , reqReserva.dia, reqReserva.horario);
          const respuesta1 = await this.usuariosCollection.updateOne({ _id: idUsuario }, { $addToSet: { reservas: newReserva } });
          if (!respuesta1) {
            throw new Error("Error al guardar la reserva");
          }
          return "Reserva guardada correctamente";
        } catch (error) {
          return error;
        }
      }
      


}


export default UsuarioRepositorio;

