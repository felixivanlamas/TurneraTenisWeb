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

  getAll() {
    return apiClient.get("/usuarios");
  },

  cambioDePerfil(id, usuario){
    return apiClient.put(`/usuarios/${id}`, usuario)
  },

  borrarCuenta(){
    return apiClient.delete(`/usuarios/${id}`)
  }
};
