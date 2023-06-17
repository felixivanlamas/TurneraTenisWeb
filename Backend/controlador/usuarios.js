import ServicioUsuario from "../servicio/usuarios.js"
import {InvalidCredentialsError} from "../errores.js"
import ServicioCanchas from "../servicio/canchas.js"

class ControladorUsuario {

  constructor() {
    this.servicioUsuario = new ServicioUsuario()
    this.servicioCancha = new ServicioCanchas()
  }

  registro = async (req, res) => {
    try {
      const { email, username, contrasenia } = req.body
      const newUser = await this.servicioUsuario.registro(email, username, contrasenia);
      res.status(200).send(newUser);
    } catch (error) {
      console.log(error.message)
      res.status(500).send(error.message);
    }
  };

  login = async (req, res) => {
    try {
      const { email, contrasenia } = req.body
      const usuario = await this.servicioUsuario.login(email, contrasenia);
      res.status(200).json(usuario);
    } catch (error) {
      console.log(error.message)
      res.status(500).send(error.message);
    }
  };

  editarUsuario = async (req, res) => {
    try {
      const {id} = req.params
      const { email, username, contrasenia } = req.body
      const respuesta = await this.servicioUsuario.editarUsuario(id, email, username, contrasenia);
      res.status(200).send(respuesta);
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  }

  eliminarCuenta = async (req, res) => {
    try {
      const {id} = req.params
      const respuesta = await this.servicioUsuario.eliminarCuenta(id);
      res.status(200).send(respuesta);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  obtenerUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await this.servicioUsuario.obtenerUsuario(id);
        res.status(200).json(usuario);
    } catch (error) {
       if (error instanceof InvalidCredentialsError) {
            res.status(400).json(error.message);
           
        } else {
             res.status(500).json({
            message:
                "Hubo un problema interno. Intente nuevamente más tarde.",
        });
        }
    }
};
    
reservarCancha = async (req, res) => {
  try {
    const { idUsuario, titulo,  dia, horario } = req.body
    const reqReserva = {idUsuario, titulo, dia, horario}
    await this.servicioUsuario.reservar(reqReserva);
    const respuesta = await this.servicioCancha.modificarCancha(titulo, dia, horario);
    res.status(200).json(respuesta)
  } catch (error) {
      if (error instanceof InvalidCredentialsError) {
          res.status(400).json(error.message);
     
      } else {
          res.status(500).json({
          message:
          "Hubo un problema interno. Intente nuevamente más tarde.",
          });
        }
  }
}


}
export default ControladorUsuario 