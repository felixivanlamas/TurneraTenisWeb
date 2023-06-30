import ModelUsuario from "../repositorios/repositorio_usuario.js"
import { ObjectId } from 'mongodb';
import  ServicioCanchas  from "./canchas.js"
import usuarioValidacion from "../validaciones/usuarioValidacion.js";



class ServicioUsuario{

    constructor() {
        this.model = new ModelUsuario()
        this.servicioCanchas = new ServicioCanchas()
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

      editarUsuario = async (id, datos) => {
        const filter = {_id:new ObjectId(id)}
        try {
          const respuesta = await this.model.editarUsuario(filter, datos)

          if(!respuesta){
            throw new Error("No se pudo editar el usuario")
          }
          return respuesta
        } catch (error) {
          throw new Error(error);
        }
      };

      eliminarCuenta = async (id) => {
        const filter = {_id:new ObjectId(id)}
        try {
          return await this.model.eliminarCuenta(filter);
        } catch (error) {
          throw new Error(error);
        }
      };

      
      
      getAll= async () => {
        try {
          const listaUsuarios = await this.model.getAll()
          return listaUsuarios
        } catch (error) {
          throw new Error(error);
        }
      }

      //Logica reservar
      reservar = async (reqReserva) => {
        try {
          const usuarioActualizado = await this.model.guardarReserva(reqReserva)
          if(!usuarioActualizado){
            this.servicioCanchas.agregarDatos(reqReserva)
            throw new Error("No se pudo guardar la reserva")
          }
          return usuarioActualizado
        } catch (error) {
          throw new Error(error);
        }
      }


      puedeReservar = async (id, dia) => {
        try {
          const usuario = await this.obtenerUsuario(id)
          await usuarioValidacion.puedeReservar(usuario,dia);
          return
        } catch (error) {
          throw new Error(error);
        }
      }
      


      //Logica Eliminar Reservas
      eliminarReserva= async (reqReserva ) => {
        const filter = new ObjectId(reqReserva.id)
        try {
          const tieneMulta = await usuarioValidacion.multar(reqReserva.dia,reqReserva.horario)
          if (tieneMulta) {
            await this.model.multar(filter);
          }
          const respuesta = await this.model.eliminarReserva(filter,reqReserva)
          await this.servicioCanchas.agregarDatos(reqReserva)
          console.log(respuesta);
          return respuesta
        } catch (error) {
          throw new Error(error);
        }
      }
      
}
export default ServicioUsuario
