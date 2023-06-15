import axiosClient from "./axiosClient.js";
const apiClient = axiosClient.getApiClient();

export const canchasService = {
  getAll() {
    return apiClient.get("/canchas");
  },
  getCancha(id) {
    return apiClient.get("/canchas/"+{id})
  }
};
