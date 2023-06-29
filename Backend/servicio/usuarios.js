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

      reservar = async (reqReserva) => {
        try {
          const usuarioActualizado = await this.model.guardarReserva(reqReserva)
          return usuarioActualizado
        } catch (error) {
          throw new Error(error);
        }
      }

      eliminarReserva= async (reqReserva ) => {
        const filter = {_id:new ObjectId(reqReserva.id)}
        try {
          const respuesta = await this.model.eliminarReserva(filter,reqReserva)
          return respuesta
        } catch (error) {
          throw new Error(error);
        }
      }

      getAll= async () => {
        try {
          const listaUsuarios = await this.model.getAll()
          return listaUsuarios
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


      multar = async (id, dia, horario) => {
        const usuario = await this.obtenerUsuario(id);
        let noTieneMulta = true;
        for (const reserva of usuario.reservas) {
          if (reserva.dia === dia && reserva.horario === horario) {
            const fechaReserva = this.calcularFechaLimite(dia, horario);
            const fechaActual = new Date();
            
            if (fechaActual > fechaReserva) {
              noTieneMulta = false;
              await this.model.multar(usuario.id);
            }
          }
        } 
        return noTieneMulta;
      };
      

      calcularFechaLimite = (dia, horario) => {
        const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
        const horasMinutos = horario.split(":");
        const fechaReserva = new Date();
        
        // Obtener el índice del día de la semana en base a su nombre
        const diaSemana = diasSemana.findIndex((d) => d === dia);
        
        // Establecer el día de la semana y la hora en la fecha de reserva
        fechaReserva.setDate(fechaReserva.getDate() - (fechaReserva.getDay() - diaSemana));
        fechaReserva.setHours(horasMinutos[0]);
        fechaReserva.setMinutes(horasMinutos[1]);
        fechaReserva.setSeconds(0);
        fechaReserva.setMilliseconds(0);
        
        // Agregar 24 horas a la fecha de reserva
        fechaReserva.setDate(fechaReserva.getDate() + 1);
        
        return fechaReserva;
      };


      
      
}
export default ServicioUsuario
