import ServicioUsuario from "../servicio/usuarios.js"
import {InvalidCredentialsError} from "../errores.js"
import ServicioCanchas from "../servicio/canchas.js"

class ControladorUsuario {

  constructor() {
    this.servicioUsuario = new ServicioUsuario()
    this.servicioCancha = new ServicioCanchas()
  }

  registro = async (req, res) => {
    const { email, username, contrasenia } = req.body
    try {
      const newUser = await this.servicioUsuario.registro(email, username, contrasenia);
      res.status(200).send(newUser);
    } catch (error) {
      console.log(error.message)
      res.status(500).send(error.message);
    }
  };

  login = async (req, res) => {
    const { email, contrasenia } = req.body
    try {
      const usuario = await this.servicioUsuario.login(email, contrasenia);
      res.status(200).json(usuario);
    } catch (error) {
      console.log(error.message)
      res.status(500).send(error.message);
    }
  };

  editarUsuario = async (req, res) => {
    const {id} = req.params
    const { email, username, contrasenia } = req.body
    try {
      const respuesta = await this.servicioUsuario.editarUsuario(id, email, username, contrasenia);
      res.status(200).json(respuesta);
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  }

  eliminarCuenta = async (req, res) => {
    const {id} = req.params
    try {
      const respuesta = await this.servicioUsuario.eliminarCuenta(id);
      res.status(200).send(respuesta);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  obtenerUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await this.servicioUsuario.obtenerUsuario(id);
        if (!usuario) {
          res.status(401).json({
            message: "Usuario no autenticado",
          });
        } else {
          res.status(200).json(usuario);
        }
    } catch (error) {
       if (error instanceof InvalidCredentialsError) {
            res.status(400).json(error.message);
           
        }
    }
};
    
reservarCancha = async (req, res) => {
  const {id} = req.params
  const {titulo,  dia, horario } = req.body
  const reqReserva={id,titulo,dia, horario}
  try {
    const tituloCancha = await this.servicioCancha.modificarCancha(titulo, dia, horario);
    if(!tituloCancha) {
      res.status(401).json({
        message: "Cancha no encontrada",
      });
    }
    const usuario = await this.servicioUsuario.reservar(reqReserva);
    res.status(200).json(usuario)
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