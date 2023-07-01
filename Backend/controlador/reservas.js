import ServicioUsuario from "../servicio/usuarios.js"
import ServicioCanchas from "../servicio/canchas.js"
import reservasValidacion from "../validaciones/reservasValidacion.js";


class ControladorReserva {

  constructor() {
    this.servicioCancha = new ServicioCanchas()
    this.servicioUsuario = new ServicioUsuario()
  }

  reservarCancha = async (req, res) => {
    const {id} = req.params
    const {titulo,  dia, horario } = req.body
    const reqReserva={id, titulo, dia, horario}
    try {
      //Regla de Negocio reserva
      reservasValidacion.validarReserva(titulo,  dia, horario);
      await this.servicioUsuario.puedeReservar(reqReserva.id, reqReserva.dia);
      await this.servicioCancha.modificarCancha(titulo, dia, horario);
      const usuario = await this.servicioUsuario.reservar(reqReserva);
      res.status(200).json(usuario.value);
    } catch (error) {
      if (error.message === "El usuario es null") {
        res.status(404).json({ error: error.message });
      }
      res.status(422).json(error.message);
    }
  }

  eliminarReserva = async (req, res) => {
    const {id} = req.params
    const { titulo, dia, horario } = req.body
    const reqReserva={id,titulo,dia, horario}
    try {
      reservasValidacion.validarReserva(titulo, dia, horario);
      const respuesta = await this.servicioUsuario.eliminarReserva(reqReserva)
      res.status(200).json(respuesta);
    }catch (error) {
      if (error.message === "2000$ fueron agregados a tu deuda") {
        res.status(400).json({ error: error.message, respuesta: respuesta });
      } else {
        res.status(401).json(error.message);
      }
    }
    
  }


}
export default ControladorReserva 