import ServicioUsuario from "../servicio/usuarios.js"
import {InvalidCredentialsError} from "../errores.js"
import ServicioCanchas from "../servicio/canchas.js"
import validaciones from '../validaciones/usuarioValidacion.js'

class ControladorUsuario {

  constructor() {
    this.servicioUsuario = new ServicioUsuario()
    this.servicioCancha = new ServicioCanchas()
  }

  registro = async (req, res) => {
    try {
    const { email, username, contrasenia } = req.body
    const usuario = req.body
    const validado = validaciones.validar(usuario)
    if (validado.result) {
      const newUser = await this.servicioUsuario.registro(email, username, contrasenia);
      res.status(200).send(newUser);
    }
    else {
      throw validado.error;
    }
    } catch (error) {
      console.log(error.message)
      res.status(400).send(error.message);
    }
  };

  login = async (req, res) => {
    const { email, contrasenia } = req.body
    try {
      const usuario = await this.servicioUsuario.login(email, contrasenia);
      res.status(200).json(usuario);
    } catch (error) {
      console.log(error.message)
      res.status(400).send(error.message);
    }
  };

  editarUsuario = async (req, res) => {
    const {id} = req.params
    const datos = req.body
    try {
      const respuesta = await this.servicioUsuario.editarUsuario(id, datos);
      res.status(200).send(respuesta);
    } catch (error) {
      console.error(error.message);
      res.status(400).send(error.message);
    }
  }

  eliminarCuenta = async (req, res) => {
    const {id} = req.params
    try {
      const usuarioEliminado = await this.servicioUsuario.eliminarCuenta(id);
      await this.servicioCancha.agregarArrayDatos(usuarioEliminado.reservas)
      res.status(200).send(usuarioEliminado);
    } catch (error) {
      res.status(400).send(error.message);
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
  
  getAll = async(req, res) => {
    try {
      const listaUsuarios = await this.servicioUsuario.getAll();
      res.status(200).json(listaUsuarios);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

}
export default ControladorUsuario 