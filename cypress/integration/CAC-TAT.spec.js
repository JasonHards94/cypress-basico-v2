/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
    beforeEach(() => {
        cy.visit('../src/index.html')
    });
    it('verifica o título da aplicação', function () {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
    it('preenche os campos obrigatórios e envia o formulário', () => {
        const longText = 'Teste, Teste, Teste, Teste, Teste'
        cy.get('input[id="firstName"]').should('be.visible').type('Jason')
        cy.get('input[id="lastName"]').should('be.visible').type('Silva')
        cy.get('input[id="email"]').should('be.visible').type('teste@teste.com.br')
        cy.get('input[id="phone"]').should('be.visible').type('11977488436').should('have.value', '11977488436')
        cy.get('select').select('Cursos').should('be.visible')
        //cy.get('input[type="radio"]').check('Elogio')
        //cy.get('input[name="email"]').check()
        cy.get('#open-text-area').type(longText, { delay: 0 })
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    });
    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        const longText = 'Teste, Teste, Teste, Teste, Teste'
        cy.get('input[id="firstName"]').should('be.visible').type('Jason')
        cy.get('input[id="lastName"]').should('be.visible').type('Silva')
        cy.get('input[id="email"]').should('be.visible').type('teste@@teste.com.br')
        cy.get('input[id="phone"]').should('be.visible').type('11977488436')
        cy.get('select').select('Cursos').should('be.visible')
        //cy.get('input[type="radio"]').check('Elogio')
        //cy.get('input[name="email"]').check()
        cy.get('#open-text-area').type(longText, { delay: 0 })
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    });
    it('Valor não-numérico for digitado, seu valor continuará vazio', () => {
        const longText = 'Teste, Teste, Teste, Teste, Teste'
        cy.get('input[id="firstName"]').should('be.visible').type('Jason')
        cy.get('input[id="lastName"]').should('be.visible').type('Silva')
        cy.get('input[id="email"]').should('be.visible').type('teste@@teste.com.br')
        cy.get('input[id="phone"]').should('be.visible').type('abc').should('have.value', '')
        cy.get('select').select('Cursos').should('be.visible')
        //cy.get('input[type="radio"]').check('Elogio')
        //cy.get('input[name="email"]').check()
        cy.get('#open-text-area').type(longText, { delay: 0 })
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    });
    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        const longText = 'Teste, Teste, Teste, Teste, Teste'
        cy.get('input[id="firstName"]').should('be.visible').type('Jason')
        cy.get('input[id="lastName"]').should('be.visible').type('Silva')
        cy.get('input[id="email"]').should('be.visible').type('teste@teste.com.br')
        cy.get('input[id="phone"]').should('be.visible').type('abc').should('have.value', '')
        cy.get('select').select('Cursos').should('be.visible')
        cy.get('#phone-checkbox').check()
        //cy.get('input[type="radio"]').check('Elogio')
        //cy.get('input[name="email"]').check()
        cy.get('#open-text-area').type(longText, { delay: 0 })
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    });
    it('Preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        const longText = 'Teste, Teste, Teste, Teste, Teste'
        cy.get('input[id="firstName"]').should('be.visible').type('Jason').should('have.value', 'Jason').clear().should('have.value', '')
        cy.get('input[id="lastName"]').should('be.visible').type('Silva').should('have.value', 'Silva')
        cy.get('input[id="email"]').should('be.visible').type('teste@teste.com.br')
        cy.get('input[id="phone"]').should('be.visible').type('abc').should('have.value', '')
        cy.get('select').select('Cursos').should('be.visible')
        cy.get('#phone-checkbox').click()
        //cy.get('input[type="radio"]').check('Elogio')
        //cy.get('input[name="email"]').check()
        cy.get('#open-text-area').type(longText, { delay: 0 })
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    });
    it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    });
    it('envia o formuário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    });
    it('seleciona um produto (YouTube) por seu texto', () => {
        const longText = 'Teste, Teste, Teste, Teste, Teste'
        cy.get('input[id="firstName"]').should('be.visible').type('Jason')
        cy.get('input[id="lastName"]').should('be.visible').type('Silva')
        cy.get('input[id="email"]').should('be.visible').type('teste@teste.com.br')
        cy.get('input[id="phone"]').should('be.visible').type('11977488436').should('have.value', '11977488436')
        cy.get('#product').select('YouTube').should('be.visible').should('have.value', 'youtube')
        //cy.get('input[type="radio"]').check('Elogio')
        //cy.get('input[name="email"]').check()
        cy.get('#open-text-area').type(longText, { delay: 0 })
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    });
    it('seleciona um produto (Mentoria) por seu valor (value)', () => {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    });
    it('seleciona um produto (blog) por seu Índice', () => {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    });
    it('marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    });
    it('marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]')
            .should('have.length', 3).each(($radio) => {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    });
    it('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    });
    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json')
            .should(($input) => {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    });
    it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
            .should(($input) => {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    });
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('@sampleFile', { action: 'drag-drop' })
            .should(($input) => {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    });
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    });
    it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
        cy.get('#privacy a').should('removeAttr', 'target').click()
        cy.contains('Talking About Testing').should('be.visible')
    });
    it.only('testa a página da política de privacidade de forma independente', () => {
        cy.visit('./src/privacy.html')
        cy.contains('Talking About Testing').should('be.visible')
    });
});

