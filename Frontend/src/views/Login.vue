<script>
import { ref} from "vue";
import { useUserStore } from "../stores/user.js";
import { useRouter } from "vue-router";

export default {
  setup() {
    const usuario = ref({
      email: "",
      contrasenia: "",
    });

    const store = useUserStore();
    const router = useRouter();

    const loguear = async () => {
      try {
        await store.login(usuario.value);
        // Acción de inicio de sesión completada con éxito, redirigir a la página principal
        // Aquí puedes agregar la redirección que desees, en este caso redirigiré a "/home"
        // Asegúrate de importar y usar la instancia del enrutador adecuada en tu proyecto
        router.push("/");
      } catch (error) {
        console.log(error);
        alert(error.response.data);
      }
    };

    return {
      usuario,
      loguear,
    };
  },
};
</script>

<template>
  <h1>Login</h1>
  <form @submit.prevent="loguear(usuario)">
    <div class="form-group">
      <label for="exampleInputEmail1">Email address</label>
      <input
        v-model="usuario.email"
        type="email"
        class="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
        required
      />
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Password</label>
      <input
        v-model="usuario.contrasenia"
        type="password"
        class="form-control"
        id="exampleInputPassword1"
        required
      />
    </div>
    <button type="submit" class="btn btn-primary">Login</button>
  </form>
</template>

<style></style>
