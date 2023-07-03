import ServicioCanchas from "../servicio/canchas.js"
import canchasValidacion from "../validaciones/canchasValidacion.js";
import {ServicioError} from "../errores.js";

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
      res.status(400).json(error.message);
    }
  }

  crearCancha = async(req,res) => {
    const cancha = req.body
    try {
        const validacion = canchasValidacion.validarCancha(cancha);
        if (!validacion.result) {
          throw validacion.error;
        }
        const respuesta = await this.servicio.crearCancha(titulo,tipo,imagen)
        res.status(200).json(respuesta)
    } catch (error) {
      if(error instanceof ServicioError){
        res.status(400).json(error.message)
      }else{
        res.status(422).json(error.message);
      }
    }
  }

  getCancha = async(req,res) => {
    try {
        const {id} = req.params
        const cancha = await this.servicio.getCancha(id)
        res.status(200).json(cancha)
    } catch (error) { 
      res.status(400).json(error.message);
    }
  }
};


export default ControladorCanchas 