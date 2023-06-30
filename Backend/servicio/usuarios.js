import ModelUsuario from "../repositorios/repositorio_usuario.js"
import { ObjectId } from 'mongodb';
import  ServicioCanchas  from "./canchas.js"



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
          return usuarioActualizado
        } catch (error) {
          throw new Error(error);
        }
      }
      puedeReservar = async (id, dia) => {
        const usuario = await this.obtenerUsuario(id);
        const puedeReservar={dia:true,capacidad:true,debe:0}
        for (const reserva of usuario.reservas) {
          if (reserva.dia === dia) {
            puedeReservar.dia=false; // El usuario ya tiene una reserva con el mismo día
          }
        }
        puedeReservar.capacidad=(usuario.reservas.length < 3)
        puedeReservar.debe = usuario.debe
        return puedeReservar; // No se encontró ninguna reserva con el mismo día
      };
      


      //Logica Eliminar Reservas
      eliminarReserva= async (reqReserva ) => {
        const filter = new ObjectId(reqReserva.id)
        try {
          const tieneMulta = await this.multar(reqReserva.id,reqReserva.dia,reqReserva.horario)
          if (tieneMulta) {
            await this.model.multar(filter);
            await this.model.eliminarReserva(filter, reqReserva);
            await this.servicioCanchas.agregarDatos(reqReserva)
            throw new Error("Debe una multa de 2000$")
          }
          const respuesta = await this.model.eliminarReserva(filter,reqReserva)
          await this.servicioCanchas.agregarDatos(reqReserva)
          return respuesta
        } catch (error) {
          throw new Error(error);
        }
      }
      
      multar = async (id, dia, horario) => {
        const usuario = await this.obtenerUsuario(id);
        let tieneMulta = false;
        for (const reserva of usuario.reservas) {
          if (reserva.dia === dia && reserva.horario === horario) {
            tieneMulta = this.calcularFechaLimite(dia, horario);
            
          }
        }
        return tieneMulta;
      };
      

      calcularFechaLimite = (dia, horario) => {
        const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
        const horasMinutos = horario.split(":");
        const fechaActual = new Date();
        const fechaReserva = new Date();
        // Obtener el índice del día de la semana en base a su nombre
        const diaSemana = diasSemana.findIndex((d) => d === dia);
        // Establecer el día de la semana y la hora en la fecha de reserva
        fechaReserva.setDate(fechaActual.getDate() - (fechaActual.getDay() - diaSemana));
        fechaReserva.setHours(horasMinutos[0]);
        fechaReserva.setMinutes(horasMinutos[1]);
        fechaReserva.setSeconds(0);
        fechaReserva.setMilliseconds(0);
        // Comparar la fecha de reserva con la fecha actual
        const diferenciaHoras = Math.abs(fechaReserva - fechaActual) / 36e5; // Obtener la diferencia en horas
        if (diaSemana === fechaActual.getDay()) {
          if (0 < diferenciaHoras < 24) {
            return true;
          }
        } else {
          if (0 < diferenciaHoras < 24) {
            return true;
          }
        }
      
        return false;
      };
      

      
      
}
export default ServicioUsuario
