Cypress.Commands.add('token', (email, senha) => {
    cy.request({
        method: 'POST',
        url: 'login',
        body: {
            "email": email,
            "password": senha 
        }
    }).then((response) => {
        expect(response.status).to.equal(200)
        return response.body.authorization
    })
 })

 Cypress.Commands.add('cadastrarUsuario' , (nome, email, password, administrador) =>{
    cy.request({
        method: 'POST', 
        url: 'usuarios',
        body: {
            "nome": nome,
            "email": email,
            "password": password,
            "administrador": administrador
          }, 
          failOnStatusCode: false
    })
 })