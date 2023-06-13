const chai = require('chai');
const expect = chai.expect;
const RepositorioUsuario = require('../repositorios/repositorio_usuario');

describe('Repositorio', () => {
  let repositorio;
  const coleccion = 'usuarios';
  repositorio = new RepositorioUsuario(coleccion);

  it('Guardar un elemento en la base de datos', function () {
    const elemento = { nombre: 'John', edad: 30 };
    repositorio.guardar(elemento);

  });
});
