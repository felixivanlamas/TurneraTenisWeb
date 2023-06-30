import Joi from "joi"


// Validaciones del body
const usuarioSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  contrasenia: Joi.string().required(),
});

const validar = usuario => {
    const { error } = usuarioSchema.validate(usuario);
    if (error) {
      return { result: false, error };
    }
    return { result: true };
}

const usuarioSchemaLogin = Joi.object({
  email: Joi.string().email().required(),
  contrasenia: Joi.string().required(),
});

const validarLogin = usuario => {
  const { error } = usuarioSchemaLogin.validate(usuario);
  if (error) {
    return { result: false, error };
  }
  return { result: true };
}


//Valicadiciones del Servicio

const puedeReservar = async (usuario,dia) =>{
  for (const reserva of usuario.reservas) {
    if (reserva.dia === dia) {
      throw new Error("El usuario ya tiene una reserva con el mismo día")
    }else if(usuario.reservas.length > 3){
      throw new Error("El usuario supero la cantidad de reservas maximas(3)")
    }else if(usuario.debe > 0){
      throw new Error("El usuario debe plata")
    }
    }
  return 
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



export default {
    validar,
    validarLogin,
    multar,
    puedeReservar,
    calcularFechaLimite,
  };
  