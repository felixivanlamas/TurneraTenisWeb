import ModelUsuario from "../repositorios/repositorio_usuario.js"
import { ObjectId } from 'mongodb';
class ServicioUsuario{

    constructor() {
        this.model = new ModelUsuario()
      }

      registro = async (email,userame,contrasenia) => {
        try {
          const newUser = await this.model.registro(email,userame,contrasenia)
          return newUser;
        } catch (error) {
          throw new Error(error);
        }
      };

      login = async (email, contrasenia) => {
        try {
          const usuario = await this.model.login(email); 
          if (contrasenia === usuario.contrasenia) {
            console.log("Inicio de sesión exitoso de " + email);
            return usuario;
          } else {
            throw new Error("Contraseña incorrecta");
          }
        } catch (error) {
          throw new Error(error);
        }
      };

      obtenerUsuario = async (id) => {
        try {
          const idUsuario = new ObjectId(id)
          const usuario = await this.model.obtenerUsuario(idUsuario);
          return usuario;
        } catch (error) {
          throw new Error(error);
        }
      }

      editarUsuario = async (id, email, username, contrasenia) => {
        try {
          const filter = {_id:new ObjectId(id)}
          const usuarioEditado = await this.model.editarUsuario(filter, email, username, contrasenia)
          if(!usuarioEditado){
            throw new Error("No se pudo editar el usuario")
          }
          return usuarioEditado;
        } catch (error) {
          throw new Error(error);
        }
      };

      eliminarCuenta = async (id) => {
        try {
          const filter = {_id:new ObjectId(id)}
          return await this.model.eliminarCuenta(filter);
        } catch (error) {
          throw new Error(error);
        }
      };

      reservar = async (reqReserva) => {
        try {
          const usuarioActualizado = await this.model.guardarReserva(reqReserva) 
          return usuarioActualizado
        } catch (error) {
          throw new Error(error);
        }
      }

}
export default ServicioUsuario
