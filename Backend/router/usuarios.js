import express from "express";
import ControladorUsuario from '../controlador/usuarios.js'

class RouterUsuario {

    constructor() {
        this.router = express.Router()
        this.controlador = new ControladorUsuario()
    }

    start() {
        this.router.post("/register", this.controlador.registro)
        this.router.post("/login", this.controlador.login)
        this.router.get("/:id", this.controlador.obtenerUsuario)
        this.router.put("/:id", this.controlador.editarUsuario)
        this.router.delete("/:id",this.controlador.eliminarCuenta)
        this.router.post("/:id",this.controlador.reservarCancha)
        return this.router
    }
}
export default RouterUsuario