import ModelUsuario from "../repositorios/repositorio_usuario.js"

class ServicioUsuario{

    constructor() {
        this.model = new ModelUsuario()
      }

      registro = async (email,userame,contrasenia) => {
        try {
          const respuesta = await this.model.registro(email,userame,contrasenia) // registramos el usuario con el hash
          return respuesta;
        } catch (error) {
          throw new Error(error);
        }
      };

      login = async (email, contrasenia) => {
        try {
          const usuario = await this.model.login(email); // Obtener el usuario de la base de datos
          if (contrasenia === usuario.contrasenia) {
            console.log("Inicio de sesión exitoso de " + email);
            return usuario;
          } else {
            throw new Error("Contraseña incorrecta");
          }
        } catch (error) {
          throw new Error(error);
        }
      };

      editarUsuario = async (email, username, contrasenia) => {
        try {
          const usuario = await this.model.editarUsuario(email, username, contrasenia)
        } catch (error) {
          throw new Error(error);
        }
      };

      cambiarEmail = async (email, nuevoEmail) => {
        try {
          await this.model.cambiarEmail(email, nuevoEmail);
        } catch (error) {
          throw new Error(error);
        }
      };

      eliminarCuenta = async (email, contrasenia) => {
        try {
          const usuario = await this.model.login(email); // Obtener el usuario de la base de datos
          if (usuario.contrasenia == contrasenia) {
            await this.model.eliminarCuenta(email);
          } else {
            throw new Error("Contraseña invalida");
          }
        } catch (error) {
          throw new Error(error);
        }
      };

      logout = async (email) => {
        try {
          const user = await this.model.logout(email);
          return user
        } catch (error) {
          throw new Error(error);
        }
      }

      reservar = async (reqReserva) => {
        try {
          const respuesta = await this.model.guardarReserva(reqReserva) 
          return respuesta
        } catch (error) {
          throw new Error(error);
        }
      }

}
export default ServicioUsuario
