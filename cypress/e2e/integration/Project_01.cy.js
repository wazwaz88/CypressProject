describe('Project - Form Elements', () => {


    it('Test Case 01 - Validate the Contact Us information', () => {
        cy.visit('https://techglobal-training.com/frontend/project-1');
        cy.get('.is-size-3').should('have.text', 'Contact Us')
        .next().should('have.text', '2860 S River Rd Suite 480, Des Plaines, IL 60018')
        .next().should('have.text', 'info@techglobalschool.com')
        .next().should('have.text', '(773) 257-3010')

    })


    it('Test Case 02 - Validate the Full name input box', () => {
        cy.visit('https://techglobal-training.com/frontend/project-1');
        cy.get('input[placeholder="Enter your full name"]').should('be.visible').and('have.attr', 'required');
        cy.get('input[placeholder="Enter your full name"]').should('have.attr', 'placeholder', 'Enter your full name').parent().prev().should('have.text', 'Full name *')

    })


    it('Test Case 03 - Validate the Gender radio button', () => {
        cy.visit('https://techglobal-training.com/frontend/project-1');
        cy.get('.field .control .label').should('have.text', 'Gender *')

        const genderOptions = ['Male', 'Female', 'Prefer not to disclose']

        cy.get('label[class*="radio"]').each((el, index) => {
            cy.wrap(el).should('have.text', genderOptions[index])
            .get('input[type="radio"]').should('be.enabled').and('not.be.selected').and('have.attr', 'required')
            
        })

        cy.get('input[type="radio"]').as('options');

        cy.get('@options').first().check().should('be.checked')
        cy.get('@options').eq(1).check().should('be.checked')

        

    })

    const testData = [
        {
            description: 'Validate the Address input box',
            label: 'Address',
            placeholder: 'Enter your address',
            required: false
        },
        {
            description: 'Validate the Email input box',
            label: 'Email *',
            placeholder: 'Enter your email',
            required: true
        },
        {
            description: 'Validate the Phone input box',
            label: 'Phone',
            placeholder: 'Enter your phone number',
            required: false
        },
        {
            description: 'Validate the Message input box',
            label: 'Message',
            placeholder: 'Type your message here...',
            required: false
        }
    ]
    
    testData.forEach((test, index) => {
    
        it(`Test Case 0${index + 4} - ${test.description}`, () => {
            cy.visit('https://techglobal-training.com/frontend/project-1')
        
            cy.contains('.label', test.label).should('have.text', test.label)
        
            cy.contains('.label', test.label).parent().find('input, textarea').should('be.visible')
            .and('have.attr', 'placeholder', test.placeholder)
            .and(test.required ? 'have.attr' : 'not.have.attr', 'required')
        })
    })


    it('Test Case 08 - Validate the Consent checkbox', () => {
        cy.visit('https://techglobal-training.com/frontend/project-1');
        cy.get('.checkbox').should('have.text', ' I give my consent to be contacted.')
        cy.get('.checkbox input').should('be.enabled')
        .click().should('be.checked')
        .click().should('not.be.checked')
        .and('have.attr', 'required')

    })


    it('Test Case 09 - Validate the SUBMIT button', () => {
        cy.visit('https://techglobal-training.com/frontend/project-1');
        cy.get('.is-link').should('be.visible').and('be.enabled').and('have.text', 'SUBMIT')
        

    })

    it.only('Test Case 10 - Validate the SUBMIT button', () => {
        cy.visit('https://techglobal-training.com/frontend/project-1');

        const info = ['Abdullah', 'Portillos', 'example@email.com', '000-000-0000', 'Hello, my name is Abdullah']

        cy.get('.input,.textarea').each((el, index) => {
            cy.wrap(el).type(info[index]);
        })
        cy.get('input[type="radio"]').as('options');

        cy.get('@options').first().check();

        cy.get('.checkbox input').click();

        cy.get('.is-link').click()

        Cypress.on('uncaught:exception', () => {
            // returning false here prevents Cypress from
            // failing the test
            return false
          })

        cy.get('.mt-5').should('have.text', 'Thanks for submitting!').and('be.visible')
        
        

    })


})