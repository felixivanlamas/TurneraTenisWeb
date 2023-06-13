import ServicioUsuario from "../servicio/usuarios.js"

class ControladorUsuario {

  constructor() {
    this.servicio = new ServicioUsuario()
  }

  inicio = async (req, res) => {
    res.status(200).send('<div><h1>Servidor de Turnera Tenis</h1></div>');
  }

  registro = async (req, res) => {
    try {
      const { email, username, contrasenia } = req.body
      const respuesta = await this.servicio.registro(email, username, contrasenia);
      res.status(200).send(respuesta);
    } catch (error) {
      console.log(error.message)
      res.status(500).send(error.message);
    }
  };

  login = async (req, res) => {
    try {
      const { email, contrasenia } = req.body
      const usuario = await this.servicio.login(email, contrasenia);
      res.status(200).json(usuario);
    } catch (error) {
      console.log(error.message)
      res.status(500).send(error.message);
    }
  };

  editarUsuario = async (req, res) => {
    try {
      const { email, username, contrasenia } = req.body
      const usuario = await this.servicio.editarUsuario(email, username, contrasenia);
      res.status(200).json(usuario);

    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  }

  cambiarEmail = async (req, res) => {
    try {
      const { email, nuevoEmail} = req.body
      await this.servicio.cambiarEmail(email, nuevoEmail);
      res.status(200).json("Email modificado correctamente");
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

  eliminarCuenta = async (req, res) => {
    try {
      const { email, contrasenia } = req.body
      await this.servicio.eliminarCuenta(email, contrasenia);
      res.status(200).json("Cuenta eliminada  con el email " + email);
    } catch (error) {
      console.log("No se elimino la cuenta")
      res.status(500).send(error.message);
    }
  };

  logout = async (req,res) => {
     try{
      const {email} = req.body
      const user = await this.servicio.logout(email)
      res.status(200).json(user);
     }catch (error) {
      res.status(500).send(error.message);
    }
    
  }

  devolverUsuario = async(req,res)=> {
    try{
      const {huella} = req.body
      const usuario = await this.servicio.devolverUsuario(huella)
      res.status(200).json(usuario);
     }catch (error) {
      res.status(500).send(error.message);
    }

  }

  obtenerUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await this.servicio.obtenerUsuario(id);
        
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


};


export default ControladorUsuario 