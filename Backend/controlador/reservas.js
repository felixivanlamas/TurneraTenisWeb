import ServicioUsuario from "../servicio/usuarios.js"
import {InvalidCredentialsError} from "../errores.js"

class ControladorReserva {

  constructor() {
    this.servicioUsuario = new ServicioUsuario()
  }

  editarReserva = async (req, res) => {
    try {
      const {id} = req.params
      const { titulo, dia, horario } = req.body
      const respuesta = await this.servicioUsuario.editarReserva(id,titulo, dia, horario);
      res.status(200).send(respuesta);
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  }

  eliminarReserva = async (req, res) => {
    try {
      const {id} = req.params
      const { titulo, dia, horario } = req.body
      const respuesta = await this.servicioUsuario.eliminarReserva(id, titulo, dia, horario);
      res.status(200).send(respuesta);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }


}
export default ControladorReserva 