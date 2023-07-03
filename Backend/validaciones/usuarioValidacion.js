import Joi from "joi"
import {ValidateError} from "../errores.js"

// Validaciones del body
const validarBodyRegistro = usuario => {
  const usuarioSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    contrasenia: Joi.string().required(),
  });

  const { error } = usuarioSchema.validate(usuario);
    if (error) {
      throw new Error(error)
    }
}

const validarBodyLogin = usuario => {
  const usuarioSchemaLogin = Joi.object({
    email: Joi.string().email().required(),
    contrasenia: Joi.string().required(),
  });

  const { error } = usuarioSchemaLogin.validate(usuario);
  if (error) {
    throw new Error(error)
  }
}

const validarBodyEditar = datos => {
  const schema = Joi.object({
    username: Joi.string(),
    contrasenia: Joi.string()
  }).min(1).max(2).or('username', 'contrasenia');

  const { error } = schema.validate(datos);
  if (error) {
    throw new Error(error);
  }
}



//Valicadiciones del Servicio


//reservar
const puedeReservar = async (usuario, dia) => {
  if (usuario.debe > 0) {
    throw new ValidateError('El usuario debe $'+usuario.debe);
  }
  if (usuario.reservas.length >= 3) {
    throw new ValidateError('El usuario ya tiene 3 reservas');
  } else {
    for (const reserva of usuario.reservas) {
      if (reserva.dia === dia) {
        throw new ValidateError('El usuario no puede reservar dos veces en un mismo dia');
      }
    }
  }
}

const multar = async ( dia, horario) => {
  return calcularFechaLimite(dia, horario);
};


const calcularFechaLimite = (dia, horario) => {
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
    if (0 < diferenciaHoras && diferenciaHoras < 24) {
      return true;
    }
  } else {
    if (0 < diferenciaHoras && diferenciaHoras < 24) {
      return true;
    }
  }

  return false;
};
  


  const contieneReserva = (reqReserva, reservasUsuario) => {
    for (const reserva of reservasUsuario) {
      if (reserva.titulo === reqReserva.titulo && reserva.dia === reqReserva.dia && reserva.horario === reqReserva.horario) {
        return true;
      }
    }
    return false;
};



export default {
    validarBodyRegistro,
    validarBodyLogin,
    validarBodyEditar,
    multar,
    puedeReservar,
    calcularFechaLimite,
    contieneReserva,
  };
  