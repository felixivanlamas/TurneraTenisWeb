import axiosClient from "./axiosClient.js";
const apiClient = axiosClient.getApiClient();

export const userService = {
  login(credenciales) {
    return apiClient.post("/usuarios/login", credenciales);
  },
  register(usuario) {
    return apiClient.post("/usuarios/register", usuario);
  },

  getUser(id) {
    return apiClient.get(`/usuarios/${id}`);
  },

  reservar(id,reserva) {
    return apiClient.post(`/usuarios/${id}`, reserva);
  },

  eliminarReserva(id,reserva) {
    return apiClient.delete(`/usuarios/${id}`, reserva);
  },

  cambioDeUsername(id, usuario){
    return apiClient.put(`/usuarios/${id}`, usuario);
  }
};
