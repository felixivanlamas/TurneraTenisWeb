import ModelUsuario from "../repositorios/repositorio_usuario.js"
import { ObjectId } from 'mongodb';
import usuarioValidacion from "../validaciones/usuarioValidacion.js";
import Reserva from "../clases/reserva.js";

class ServicioUsuario{

    constructor() {
        this.model = new ModelUsuario()
      }

      registro = async (usuario) => {
        try {
          const validarEmail = await this.model.buscarEmail(usuario.email)
          const validarUsername = await this.model.buscarUsername(usuario.username)
          if (validarEmail){
            throw new Error("El email " + usuario.email + " ya se encuentra registrado!")
          } 
          if (validarUsername) {
            throw new Error("El username " + usuario.username + " ya se encuentra registrado!")
          }
          const newUser = await this.model.registro(usuario)
          return newUser;
        } catch (error) {
          throw error;
        }
      };

      login = async (usuario) => {
        try {
          const usuarioLogin = await this.model.buscarEmail(usuario.email);
          if (!usuarioLogin) {
            throw new Error("El email " + usuario.email + " no se encuentra registrado!");
          }
          if (usuarioLogin.contrasenia !== usuario.contrasenia) {
            throw new Error("Contraseña incorrecta");
          }
          return usuarioLogin;
        } catch (error) {
          throw error;
        }
      };

      obtenerUsuario = async (id) => {
        try {
          const idUsuario = new ObjectId(id)
          const usuario = await this.model.obtenerUsuario(idUsuario);
          if (!usuario) {
            throw new Error("Usuario no encontrado")
          }
          return usuario;
        } catch (error) {
          throw error;
        }
      };

      editarUsuario = async (id, datos) => {
        const filter = {_id:new ObjectId(id)} 
       
        try {
          if(datos.username){
            const username = await this.model.buscarUsername(datos.username)
            if (username) {
              throw new Error ("El username " + datos.username + " ya esta registrado, por favor ingrese otro")
            }
          }
          const respuesta = await this.model.editarUsuario(datos, filter)
          if(!respuesta){
            throw new Error("No se pudo editar el usuario")
          }
          return respuesta
        } catch (error) {
          throw error;
        }
      };

      eliminarCuenta = async (id) => {
        const filter = {_id:new ObjectId(id)}
        try {
          const usuarioEliminado = await this.model.eliminarCuenta(filter)
          if (!usuarioEliminado) {
            throw new Error("El id que esta pasando no corresponde a un usuario registrado")
        }
        console.log("La cuenta con el email " + usuarioEliminado.email +" ha sido borrada correctamente");
        return usuarioEliminado
        } catch (error) {
          throw error;
        }
      };

      getAll= async () => {
        try {
          const listaUsuarios = await this.model.getAll()
          return listaUsuarios
        } catch (error) {
          throw error;
        }
      };

      obtenerReservas = async (id) => {
        try{
          const usuario = await this.obtenerUsuario(id)
          return usuario.reservas
        }catch{
          throw error
        }
      }

      //Logica reservar
      reservar = async (id, reqReserva) => {
        try {
          const filter = {_id:new ObjectId(id)}
          await this.puedeReservar(id, reqReserva.dia)
          //se crea la nueva reserva y el repositorio se encarga de agregarlo a la reservas del usuario
          const newReserva = new Reserva(reqReserva.titulo, reqReserva.dia, reqReserva.horario);
          const usuarioActualizado = await this.model.guardarReserva(filter,newReserva)
          //error
          if (!usuarioActualizado) {
            throw new Error("No se pudo guardar la reserva");
          }
          return usuarioActualizado
        } catch (error) {
          throw error;
        }
      };

      puedeReservar = async (id, dia) => {
        try {
          const usuario = await this.obtenerUsuario(id)
          await usuarioValidacion.puedeReservar(usuario,dia);
        } catch (error) {
          throw error;
        }
      };
      
      //Logica Eliminar Reservas
      eliminarReserva = async (id, reqReserva ) => {
        const filter = {_id:new ObjectId(id)}
        try {
          const reservasUsuario = await this.obtenerReservas(id);
          const contieneReserva = usuarioValidacion.contieneReserva(reqReserva,reservasUsuario)
          if (!contieneReserva) {
            throw new Error("La reserva no existe");
          }
          const tieneMulta = await usuarioValidacion.multar(reqReserva.dia,reqReserva.horario)
          if (tieneMulta) {
            await this.model.multar(filter);
          }
          const reservaAEliminar = new Reserva(reqReserva.titulo, reqReserva.dia, reqReserva.horario);
          const usuario = await this.model.eliminarReserva(filter,reservaAEliminar)
          if (!usuario) {
            throw new Error("No se pudo eliminar la reserva");
          }
          return usuario
        } catch (error) {
          throw error;
        }
      };

}
export default ServicioUsuario
