
const assert = require('assert')
const App = require('../clases/app.js')
const reservar = require("../src/reservarTurnos.js"); 

const app = new App("¨Mi Aplicacion")


describe('App', function() {
  it('Registro de un usuario', function() {    
    // Arrage
    app.registrarUsuario()
    // Act
    const resultado = app.usuarios.length
    // Assert
    assert.equal(resultado,5)
  })
  })

describe('Registro de cancha',function() {
    it('',function(){

      app.guardarCanchas()

      const resultado=app.canchas.length
      
      assert.equal(resultado,10)

    })
  })
  
  describe('Registro de turnos',function() {
    it('Reservar turnos',function(){
      
      reservar(app)
      
      const resultado=app.reservas.length
  
      assert.equal(resultado,5)
      console.log(app.reservas);
  
    })
  })
  

