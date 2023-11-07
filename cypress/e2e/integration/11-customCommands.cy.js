/// <reference types="cypress" />

describe('Custom Commands', () => {

    it('Parent Command', () => {
        cy.visit(`${Cypress.env('SITE_URL')}/frontend`);
        cy.clickCard("Html Elements");

        cy.login('Tech', 'Global')

        cy.selectDropdownOption('#company_dropdown1', 'Apple')
        cy.selectDropdownOption('#company_dropdown2', 'Microsoft')
    })

    it('Child Command', () => {
        cy.visit(`${Cypress.env('SITE_URL')}/frontend`);
        cy.clickCard("Html Elements");

        cy.get('#main_heading').then(($el) => {
            cy.log($el.text())
        })

        cy.get('#main_heading').logText().haveText('Html Elements')


        cy.get('#main_heading').assertAttribute('id', 'main_heading')

        cy.haveText2('#main_heading', 'Html Elements')
    })
})