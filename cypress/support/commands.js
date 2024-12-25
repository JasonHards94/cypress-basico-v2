// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('fillMandatoryFieldsAndSubmit',()=>{
    const longText = 'Teste, Teste, Teste, Teste, Teste'
    cy.get('input[id="firstName"]').should('be.visible').type('Jason')
    cy.get('input[id="lastName"]').should('be.visible').type('Silva')
    cy.get('input[id="email"]').should('be.visible').type('teste@teste.com.br')
    cy.get('input[id="phone"]').should('be.visible').type('11977488436').should('have.value','11977488436')
    cy.get('select').select('Cursos').should('be.visible')
    //cy.get('input[type="radio"]').check('Elogio')
    //cy.get('input[name="email"]').check()
    cy.get('#open-text-area').type(longText,{delay:0})
    cy.get('button[type="submit"]').click()
    cy.get('.success').should('be.visible')
})