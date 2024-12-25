/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
    beforeEach(() => {
        cy.visit('../src/index.html')
    });
    it('verifica o título da aplicação', function () {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
    it('preenche os campos obrigatórios e envia o formulário', () => {
        cy.get('input[id="firstName"]').should('be.visible').type('Jason')
        cy.get('input[id="lastName"]').should('be.visible').type('Silva')
        cy.get('input[id="email"]').should('be.visible').type('teste@teste.com.br')
        cy.get('input[id="phone"]').should('be.visible').type('11977488436')
        cy.get('select').select('Cursos').should('be.visible')
        cy.get('input[type="radio"]').check('Elogio')
        cy.get('input[name="email"]').check()
        cy.get('textarea[id="open-text-area"]').type('Teste')
        cy.get('button').contains('Enviar').click()
        cy.get('.success').should('be.visible')
    });
})
