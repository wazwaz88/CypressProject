describe('Cypress Assertions', () => {

    it('Default Assertions', () => {

        // This will fail if the page doesn't send text/html with a 200 status
        cy.visit('https://techglobal-training.com/frontend')
        cy.clickCard('Html Elements')

        cy
        // there is a default assertion that this
        // button must exist in the DOM before proceeding
        .get('#register_button')
        // since cypress internally checks if the web element on the dom tree or not
        // we dont need to do below assertion
        // .should('be.visible')

        // before issuing the click, this button must be "actioanable"
        // it connat be covered, ordisabled,  hidden from the view.
        .click()

        // This will fail if the element os not typable.
        cy.get('#text_input1').type('TechGlobal')
    })

    it('Implicit Assertions', () => {

        cy.visit('https://techglobal-training.com/frontend')

        // Any assertion we do using .should() method, is an "Implicit Assertion"



        // be.visible checks if the web element displayed on the UI
        cy.get('#main_heading').should('be.visible')

        // This assertion checks if the subjected elements visible text is equal to 'Html Elements'
        cy.get('#main_heading').should('have.text', 'Html Elements')

        // This assertion checks if the subjected elements visible text is contains 'Html Elements'
        cy.get('#main_heading').should('contain.text', 'Elements')
        cy.get('#main_heading').should('include.text', 'Elements')

        
        cy.url().should('eq', 'https://techglobal-training.com/frontend/html-elements')
        cy.title().should('eq', 'TechGlobal Training | Html Elements')


        // have.attr chainer checks the elements attribute property
        // it can get 2, or 3 arguments, we can validate if element has specific attribute, and the value of it
        cy.get('#main_heading').should('have.attr', 'id')
        cy.get('#main_heading').should('have.attr', 'id', 'main_heading')
        cy.get('#facebook_link').should('have.attr', 'href', 'https://www.facebook.com/techglobaleducation')


        // 'have.length' validates how many web elements our locator returns
        cy.get('[id*="paragraph"]').should('have.length', 2)
        cy.get('#hello_paragraph').should('have.length', 1)


        // be.enabled checks if the web element is interactable
        cy.get('#checkbox_1').should('be.enabled')

        // be.checked checks if the web element is checked
        cy.get('#checkbox_1').should('not.be.checked')

        // have.css validates the css property and its value in css
        cy.get('[id*="paragraph"]').should('have.css', 'color', 'rgb(105, 105, 105)')
        cy.get('[id*="paragraph"]').should('have.css', 'padding', '0px')




        // cy.get('#hello_paragraph').should('have.text', 'Hello World!')
        // cy.get('#hello_paragraph').should('have.attr', 'id', 'hello_paragraph')
        // cy.get('#hello_paragraph').should('be.visible')


        cy.get('#hello_paragraph').should('have.text', 'Hello World!')
        .and('have.attr', 'id', 'hello_paragraph')
        .and('be.visible')


        cy.visit('https://techglobal-training.com/frontend/project-4')

        cy.get('#add_product_btn').click()
        cy.get('.delete').click()

        // NOTE: Use 'not.exist' chainer to validate web element disappeared from the DOM
        cy.get('.modal-card').should('not.exist')
    })


    it('Explicit Assertions', () => {

        cy.visit('https://techglobal-training.com/frontend')
        cy.clickCard('Html Elements')

        // Any assertion we do using .should() method, is an "Implicit Assertion"



        // be.visible checks if the web element displayed on the UI
        cy.get('#main_heading').should('have.text', 'Html Elements')

        cy.get('#main_heading').invoke('text').then((ele) => {
            const el = ele
            cy.log(el)
            expect(el).to.equal('Html Elements')
        })

        cy.get('#main_heading').then(($ele) => {
            const el = $ele.text()
            expect(el).to.equal('Html Elements')
        })

        cy.get('#main_heading').then(($ele) => {
            const el = $ele.text()
            expect(el).to.include('Elements')
        })

        cy.get('#main_heading').then(($ele) => {
            const el = $ele
            expect(el).to.exist
        })


        cy.get('#main_heading').invoke('attr', 'id').then((attr) => {
            expect(attr).to.equal('main_heading')
        })

        cy.get('#main_heading').then(($ele) => {
            expect($ele.attr('id')).to.eq('main_heading')
        })

        cy.get('[id*="paragraph"]').then(($el) => {
            expect($el).to.have.length(2)
        })

        cy.get('#checkbox_1').then(($el) => {
            expect($el).to.be.enabled
            expect($el).to.be.visible
            expect($el).not.to.be.checked
        })

        cy.get('[id*="paragraph"]').should('have.css', 'color', 'rgb(105, 105, 105)')

        cy.get('[id*="paragraph"]').then(($el) => {
            expect($el.css('color')).to.equal('rgb(105, 105, 105)')
        })

        cy.get('#main_heading').then(($el) => {
            cy.wrap($el).should('have.text', 'Html Elements')
            cy.wrap($el.text()).should('eq', 'Html Elements')
        })
})

    it('More explicit assertions - Validate Multiple elements', () => {

        cy.visit('https://techglobal-training.com/frontend')
        cy.clickCard('Html Elements')

        // If we want to validate multiple web elements, normally we would do this.
        cy.get('#hello_paragraph').should('be.visible').and('have.text', 'Hello World!')
        cy.get('#testing_paragraph').should('be.visible').and('have.text', 'I like automation testing!')

        // Or, we can locate the above elements in a single locator that we need to validate
        cy.contains('Paragraphs').nextAll().as('paragraphHeader')

        // By indexing, we can validate these elements using eq(), first() or last()
        cy.get('@paragraphHeader').first().should('have.text','Hello World!')
        cy.get('@paragraphHeader').last().should('have.text','I like automation testing!')

        cy.get('@paragraphHeader').first().should("have.text","Hello World!").next().should("have.text","I like automation testing!")

        const arr = ['Hello World!', 'I like automation testing!']

        // And we can loop through using fori loop by their index - NOT A PREFERRED WAY
        for(let i = 0; i < arr.length; i++){
            cy.get('@paragraphHeader').eq(i).should("have.text",arr[i])
        }

        // We can assert these using each() and validate using explicit assertion
        cy.get('@paragraphHeader').each(($el, index) => {
            cy.log($el.text())
            expect($el.text()).to.equal(arr[index])
            expect($el).to.be.visible
        })

        // Utilizing the wrap approach for multiple assertions
        cy.get('@paragraphHeader').each(($el, index) => {
            // To enable further chaining with Cypress commands, re-wrap the element using cy.wrap()
            // This allows for the continuious of implicit assertions
            cy.wrap($el).should('have.text', arr[index]).and('be.visible')

            // Howeever, it is important to note that if he ext is directly retrieved from the element as a string
            // the nature of the content changes from web element to plain STRING
            // In essence, assertions should adapt to use 'eq' instead of 'have.text'
            // Additionally, since the content is no longer a web element
            // furhter chaining with web element-specific commands, such as 'be.visible.' is not gonna work.
            cy.wrap($el.text()).should('eq', arr[index])
        })



        /**
         * 1. On the Html Elements page
         * 2. From the "Headings" section, locate both "Programming Languages" and "Automation Tools" web elements
         * 3. Validate their texts with expected text
         * 4. Validate these elements are visible.
         */

        cy.contains('Headings').nextAll().as('headingElements')

        const headingTexts = ['Programming Languages', 'Automation Tools']

        cy.get('@headingElements').each(($el, index) => {
            expect($el.text()).to.equal(headingTexts[index])
            expect($el).to.be.visible
            cy.log($el)
            cy.log($el.text())
            cy.wrap($el).should('have.text', headingTexts[index]).and('be.visible')
        })


        /**
         * 1. On the Html Elements page
         * 2. From the "Checkboxes" section, locate all checkboxes
         * 3. Validate their texts with expected text
         * 4. Validate checkboxes are visible, and enabled
         */

        cy.contains("Checkboxes").nextAll().as("Checkboxes")
        
        const boxes = ["Apple", "Microsoft", "Tesla"]
        
        cy.get('#checkbox-button-group > div').each(($el, index) => {
            cy.wrap($el).find('label').should('have.text', boxes[index])
            cy.wrap($el).find('input').should('be.visible').and('be.enabled')
        })
    })

    it.only('Assertion Practices', () => {

        cy.visit('https://techglobal-training.com/frontend')
        cy.clickCard('Html Elements')

        /**
         * 1. Go to https://techglobal-training.com/frontend
         * 2. Navigate to 'Html Elements' card
         * 3. From the "Text Inputs" section
         * 4. Validate text input 1 and text input 2 is enabled
         * 5. Validate text input 1 and text input 2 is is not required
         * 6. Enter your name and last name
         */

        cy.contains('Text Inputs').parent().find('input').as('textInputs')

        const names = ['Tech', 'Global']

        cy.get('@textInputs').each(($el, index) => {
            cy.wrap($el).type(names[index]).should('be.enabled').and('not.have.attr', 'required')
        })

        /**
         * 1. Go to https://techglobal-training.com/frontend
         * 2. Navigate to 'Html Elements' card
         * 3. From the "Date Inputs" section
         * 4. Validate date input 1 and date input 2 is enabled
         * 5. Validate date input 1 and date input 2 is is not required
         * 6. Enter dates for both date input 1 and date input 2
         * 7. Validate value is changed to given dates.
         */


        cy.contains('Date Inputs').parent().find('input').as('dateInputs')


        const dates = ['11/11/2000', '11/11/2000']

        cy.get('@dateInputs').each(($el, index) => {
            cy.wrap($el).clear().type(`${dates[index]}{enter}`)
            .should('have.attr', 'value', dates[index])
            .and('be.enabled')
            .and('not.have.attr', 'required')
        })
        
        /**
         * 1. Go to https://techglobal-training.com/frontend
         * 2. Navigate to 'Html Elements' card
         * 3. From the "Dropdowns" section
         * 4. Validate dropdown 1 and dropdown 2 is enabled
         * 6. Enter Microsoft for dropdown 1 and Apple for dropdown 2
         * 7. Validate options are selected
         */

        const options = ['Microsoft', 'Apple']

        cy.get('#company_dropdown1,#company_dropdown1').each(($el, index) => {
            cy.wrap($el).should('be.enabled').select(options[index]).find('option:selected').should('have.text', options[index])
        })

    })
})