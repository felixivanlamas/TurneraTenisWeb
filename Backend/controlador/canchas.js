import ServicioCanchas from "../servicio/canchas.js"

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
      res.status(500).send(error.message);
    }
  }

  crearCancha = async(req,res) => {
    try {
        const {titulo, tipo, imagen} = req.body
        const respuesta = await this.servicio.crearCancha(titulo,tipo,imagen)
        res.status(200).send(respuesta)
    } catch (error) {
        console.log(error.message)
        res.status(500).send(error.message);
    }
  }

  getCancha = async(req,res) => {
    try {
        const {id} = req.params
        const respuesta = await this.servicio.getCancha(id)
        res.status(200).send(respuesta)
    } catch (error) {
        console.log(error.message)
        res.status(500).send(error.message);
    }
  }
};


export default ControladorCanchas 