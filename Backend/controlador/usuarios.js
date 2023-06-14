import ServicioUsuario from "../servicio/usuarios.js"
import {InvalidCredentialsError} from "../errores.js"
import ServicioCanchas from "../servicio/canchas.js"

class ControladorUsuario {

  constructor() {
    this.servicioUsuario = new ServicioUsuario()
    this.servicioCancha = new ServicioCanchas()
  }

  inicio = async (req, res) => {
    res.status(200).send('<div><h1>Servidor de Turnera Tenis</h1></div>');
  }

  registro = async (req, res) => {
    try {
      const { email, username, contrasenia } = req.body
      const respuesta = await this.servicioUsuario.registro(email, username, contrasenia);
      res.status(200).send(respuesta);
    } catch (error) {
      console.log(error.message)
      res.status(500).send(error.message);
    }
  };

  login = async (req, res) => {
    try {
      const { email, contrasenia } = req.body
      const usuario = await this.servicioUsuario.login(email, contrasenia);
      res.status(200).json(usuario);
    } catch (error) {
      console.log(error.message)
      res.status(500).send(error.message);
    }
  };

  editarUsuario = async (req, res) => {
    try {
      const { email, username, contrasenia } = req.body
      const usuario = await this.servicioUsuario.editarUsuario(email, username, contrasenia);
      res.status(200).json(usuario);

    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  }

  cambiarEmail = async (req, res) => {
    try {
      const { email, nuevoEmail} = req.body
      await this.servicioUsuario.cambiarEmail(email, nuevoEmail);
      res.status(200).json("Email modificado correctamente");
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

  eliminarCuenta = async (req, res) => {
    try {
      const { email, contrasenia } = req.body
      await this.servicioUsuario.eliminarCuenta(email, contrasenia);
      res.status(200).json("Cuenta eliminada  con el email " + email);
    } catch (error) {
      console.log("No se elimino la cuenta")
      res.status(500).send(error.message);
    }
  };

  logout = async (req,res) => {
     try{
      const {email} = req.body
      const user = await this.servicioUsuario.logout(email)
      res.status(200).json(user);
     }catch (error) {
      res.status(500).send(error.message);
    }
    
  }

  devolverUsuario = async(req,res)=> {
    try{
      const {huella} = req.body
      const usuario = await this.servicioUsuario.devolverUsuario(huella)
      res.status(200).json(usuario);
     }catch (error) {
      res.status(500).send(error.message);
    }

  }

  obtenerUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await this.servicioUsuario.obtenerUsuario(id);
        
        res.status(200).json(usuario);
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
};
    
reservarCancha = async (req, res) => {
  try {
    const { idUsuario, titulo,  dia, horario } = req.body
    const reqReserva = {idUsuario, titulo, dia, horario}
    await this.servicioUsuario.reservar(reqReserva);
    const respuesta = await this.servicioCancha.modificarCancha(titulo, dia, horario);
    res.status(200).json(respuesta)
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
  };

};
export default ControladorUsuario 