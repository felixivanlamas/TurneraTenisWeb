import mongoose from 'mongoose';

class ConexionMongo {

  constructor() {
      this.url = 'mongodb+srv://turneraTenis:turneraTenis@turneratenis.yn0yl79.mongodb.net/TurneraTenis'
  }

  async conectar (){
    try {
      await mongoose.connect(this.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Conexion existosa a MongoDB');
    } catch (error) {
      console.log('No se pudo conectar a la base de datos:', error);
    }
}; 



usuariosColeccion() {
  this.usuariosDB = mongoose.connection.collection('usuarios');
  return this.usuariosDB;
}

canchasColeccion() {
  this.canchasDB = mongoose.connection.collection('canchas');
 return this.canchasDB;
}

}

export default ConexionMongo;
