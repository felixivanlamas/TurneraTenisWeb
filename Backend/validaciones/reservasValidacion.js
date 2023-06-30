import Joi from "joi";

const tituloValido = ["Cancha n°1", "Cancha n°2", "Cancha n°3", "Cancha n°4"];
const diaValido = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"];

// Validaciones del body
const validarReserva = (titulo,  dia, horario) => {
  const reservaSchema = Joi.object({
    titulo: Joi.string().valid(...tituloValido).required(),
    dia: Joi.string().valid(...diaValido).required(),
    horario: Joi.string().pattern(/^(1[2-9]|2[0-2]):00$/).required(),
  
  });

  const { error } = reservaSchema.validate({titulo,  dia, horario});
  if (error) {
    return { result: false, error };
  }
  return { result: true };
};





export default {
  validarReserva,
};
