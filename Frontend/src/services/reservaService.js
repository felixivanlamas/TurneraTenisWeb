import axiosClient from "./axiosClient.js";
const apiClient = axiosClient.getApiClient();

export const reservasService = {

  reservar(id,reserva) {
    return apiClient.post(`/reservas/${id}`, reserva);
  },

  eliminarReserva(id,reserva) {
    return apiClient.delete(`/reservas/${id}`, { data: reserva });
  },
};
