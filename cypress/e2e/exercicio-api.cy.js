/// <reference types="cypress" />
import contratos from '../contratos/usuarios.contract'

describe('Testes da Funcionalidade Usuários', () => {

  let token
  beforeEach(() => {
    cy.token('danielddf@ebac.com.br', 'teste').then(tkn => {
      token = tkn
    })
  });

  it('Deve validar contrato de usuários', () => {
    cy.request('usuarios').then(response => {
      return contratos.validateAsync(response.body)
    })

  });

  it('Deve listar usuários cadastrados', () => {
    cy.request({
      method: 'GET',
      url: 'usuarios',
    }).should(response => {
      expect(response.status).equal(200)
      expect(response.body).to.have.property('usuarios')
    })
  });

  it('Deve cadastrar um usuário com sucesso', () => {
    let email = 'usuario' + Math.floor(Math.random() * 1000000) + '@ebac.com.br'
    cy.cadastrarUsuario('Usuario Cadastrado com Sucesso', email, 'teste', 'true').should(response => {
      expect(response.status).equal(201)
      expect(response.body.message).to.equal('Cadastro realizado com sucesso')
    });
  });

  it('Deve validar um usuário com email inválido', () => {
    let usuario = 'Usuário EBAC ' + Math.floor(Math.random() * 1000000)
    cy.cadastrarUsuario(usuario, 'benicio%ebac.br', 'teste', 'true').should(response => {
      expect(response.status).equal(400)
      expect(response.body.email).to.equal('email deve ser um email válido')

    });
  })


  it('Deve editar um usuário previamente cadastrado', () => {
    let nome = 'Benício Editado ' + Math.floor(Math.random() * 10000000)
    cy.cadastrarUsuario(nome, 'benicioeditado@ebac.com.br', 'teste', 'true')
      .then(response => {
        let id = response.body.id
        cy.request({
          method: 'PUT',
          url: 'usuarios' + '/LJfGCvhkFUYIKUKj',
          body: {
            "nome": 'Benício Editado 3',
            "email": 'benicio2@ebac.com.br',
            "password": 'teste',
            "administrador": 'true'
          }
        }).should(response => {
          expect(response.body.message).to.equal('Registro alterado com sucesso')
          expect(response.status).equal(200)
        })
      })

  });

  it('Deve deletar um usuário previamente cadastrado', () => {
    let email = 'usuario' + Math.floor(Math.random() * 1000000) + '@ebac.com.br'
    cy.cadastrarUsuario('Usuário Ebac a ser Deletado', email, 'teste', 'true')
      .then(response => {
        let id = response.body._id
        cy.request({
          method: 'DELETE',
          url: `usuarios/${id}`
        }).should(resp => {
          expect(resp.body.message).to.equal('Registro excluído com sucesso')
        })
      })
  });
});

