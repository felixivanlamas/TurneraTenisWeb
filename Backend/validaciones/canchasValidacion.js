import Joi from "joi";

const tituloValido = ["Cancha n°1", "Cancha n°2", "Cancha n°3", "Cancha n°4"];
const tipoValido = ["Cesped","Cemento","Arcilla"]

const canchaSchema = Joi.object({
  titulo: Joi.string().valid(...tituloValido).required(),
  tipo: Joi.string().valid(...tipoValido).required(),
  imagen: Joi.string().required(),
});

const validarCancha = cancha => {
  const { error } = canchaSchema.validate(cancha);
  if (error) {
    return { result: false, error };
  }
  return { result: true };
};

export default {
  validarCancha,
};
