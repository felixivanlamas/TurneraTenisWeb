import axiosClient from "./axiosClient.js";
const apiClient = axiosClient.getApiClient();

export const canchasService = {
  getAll() {
    return apiClient.get("/canchas");
  },
};
