import axiosClient from "./axiosClient.js";
const apiClient = axiosClient.getApiClient();

export const userService = {
  login(usuario) {
    //Utilizo api Client que es el objeto inicializado de axios
    return apiClient.post("/usuarios/login", usuario);
    // axios pero instanciado con la direccion y las caracteristicas de la peticion.
  },
  register(usuario) {
    return apiClient.post("/usuarios/register", usuario);
  },

  getUser(/*id*/) {
    //return apiClient.get(`/usuarios/${id}`);
    return {
      username: "boris",
      email: "b@b.com",
      contrasenia: "123",
      reservas: [
        {
          titulo: "Cancha n°1",
          dia: ["Jueves"],
          horario: "23:00",
        },
        {
          titulo: "Cancha n°3",
          dia: ["Sabado"],
          horario: "12:00",
        },
      ],
    };
  },

  reservar(id, reserva) {
    return apiClient.post("/usuarios/:id", reserva);
  },

  eliminarReserva(reserva) {
    //
  },
};
