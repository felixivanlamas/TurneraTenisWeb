const Joi = require('joi');

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


export default {
    validar,
  };
  