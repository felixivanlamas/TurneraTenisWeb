import axiosClient from "./axiosClient.js";
const apiClient = axiosClient.getApiClient();

export const userService = {
    login(usuario) {
        //Utilizo api Client que es el objeto inicializado de axios
        return apiClient.post('/usuarios/login', usuario);
       // axios pero instanciado con la direccion y las caracteristicas de la peticion.
    },
    register(usuario){
        return apiClient.post('/usuarios/register', usuario);
    },

    getUser(id){
        return apiClient.get(`/usuarios/${id}`);
    },
    
    reservar(id,reserva){
        return apiClient.post(`/usuarios/${id}`,reserva);
    }
}
