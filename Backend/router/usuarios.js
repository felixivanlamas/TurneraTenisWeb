import express from "express";
import ControladorUsuario from '../controlador/usuarios.js'

class RouterUsuario {

    constructor() {
        this.router = express.Router()
        this.controlador = new ControladorUsuario()
    }

    start() {
        this.router.get("/",this.controlador.inicio)
        this.router.post("/register", this.controlador.registro)
        this.router.post("/login", this.controlador.login)
        this.router.post("/editarUsuario", this.controlador.editarUsuario)
        this.router.post("/cambiarEmail", this.controlador.cambiarEmail)
        this.router.delete("/eliminarCuenta",this.controlador.eliminarCuenta)
        //this.router.post("/:id/reservar",this.controlador.reservarCancha)
        //this.router.post("/logout",this.controlador.logout)
        
        return this.router
    }
}
export default RouterUsuario