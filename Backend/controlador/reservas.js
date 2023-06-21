import ServicioUsuario from "../servicio/usuarios.js"
import {InvalidCredentialsError} from "../errores.js"
import ServicioCanchas from "../servicio/canchas.js"

class ControladorReserva {

  constructor() {
    this.servicioCancha = new ServicioCanchas()
    this.servicioUsuario = new ServicioUsuario()
  }

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
      res.status(200).json(usuario.value);
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

  editarReserva = async (req, res) => {
    const {id} = req.params
    const { titulo, dia, horario } = req.body
    try {
      const respuesta = await this.servicioUsuario.editarReserva(id,titulo, dia, horario);
      res.status(200).send(respuesta);
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  }

  eliminarReserva = async (req, res) => {
    const {id} = req.params
    const datos = req.body
    try {
      const respuesta = await this.servicioUsuario.eliminarReserva(id)
      if(!respuesta){
        res.status(401).send('No se puede eliminar la reserva');
      }
      if(!(await this.servicioCancha.agregarDatos(datos))){
        res.status(401).send('No se puedo agregar los datos a reservasDisponibles');
      }
      res.status(200).send(respuesta);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }


}
export default ControladorReserva 