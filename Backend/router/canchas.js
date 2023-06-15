import express from "express";
import ControladorCanchas from '../controlador/canchas.js'

class RouterCanchas {

    constructor() {
        this.router = express.Router()
        this.controlador = new ControladorCanchas()
    }

    start() {
        this.router.get("/",this.controlador.getAll)
        this.router.get("/:id",this.controlador.getCancha)
        this.router.post("/", this.controlador.crearCancha)
        /* this.router.put('/',this.controlador.modificarCancha) */

        return this.router
    }
}
export default RouterCanchas