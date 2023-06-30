import express from "express";
import ControladorReserva from '../controlador/reservas.js';

class RouterReserva {

    constructor() {
        this.router = express.Router()
        this.controlador = new ControladorReserva()
    }

    start() {
        this.router.delete("/:id",this.controlador.eliminarReserva)
        this.router.post("/:id",this.controlador.reservarCancha)
        return this.router
    }
}
export default RouterReserva