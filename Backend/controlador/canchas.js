import ServicioCanchas from "../servicio/canchas.js"
import canchasValidacion from "../validaciones/canchasValidacion.js";

class ControladorCanchas {

  constructor() {
    this.servicio = new ServicioCanchas()
  }

  getAll = async (req, res) => {
    try {
      const respuesta = await this.servicio.getAll();
      res.status(200).json(respuesta);
    } catch (error) {
      console.log(error.message)
      res.status(400).send(error.message);
    }
  }

  crearCancha = async(req,res) => {
    try {
        const {titulo, tipo, imagen} = req.body
        const cancha = { titulo, tipo, imagen };
        const validacion = canchasValidacion.validarCancha(cancha);
        if (!validacion.result) {
          throw validacion.error;
        }
        const respuesta = await this.servicio.crearCancha(titulo,tipo,imagen)
        res.status(200).send(respuesta)
    } catch (error) {
        console.log(error.message)
        res.status(400).send(error.message);
    }
  }

  getCancha = async(req,res) => {
    try {
        const {id} = req.params
        const cancha = await this.servicio.getCancha(id)
        res.status(200).send(cancha)
    } catch (error) {
        console.log(error.message)
        res.status(400).send(error.message);
    }
  }

   
};


export default ControladorCanchas 