<script>
import { canchasService } from "../services/canchasService.js"

export default {
  data() {
    return {
        selectedTipo:'',
        canchas: [],
      vue: this,
    };
  },
  created() {
    this.selectedTipo = ''; // Reiniciar el valor seleccionado al crear el componente
  },
  async mounted(){ 
    try {
        const response = await canchasService.getAll();
        this.canchas =response.data
      } catch (error) {
        console.log(error.response.data);
        alert(error.response.data);
      }
  },
};
</script>
