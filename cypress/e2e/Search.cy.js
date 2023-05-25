const SearchTerm = 'cypress.io'
const Result = ".EKtkFWMYpwzMKOYr0GYm"
describe('Search', () => {
  beforeEach(() => {

    cy.intercept(
      'GET',
       `**?q=${SearchTerm}**`).as('getSearchResults')


   cy.visit('https://duckduckgo.com/')
  
   cy.get('input[type="text"]')
   .as('searchField')
   .should('be.visible')
  });
  
   it('Typing and pressing enter.', () => {
      cy.get('@searchField')
      .type(`${SearchTerm}{enter}`)
   
      cy.wait('@getSearchResults')

      cy.get(Result)
      .should('be.visible')
    });
 
 
  it('Typing and clicking on the magnifying glass button.', () => {
      cy.get('@searchField')
      .type(SearchTerm)
      cy.get('button[type="submit"]')
      .should('be.visible')
      .click()

      cy.wait('@getSearchResults')

      cy.get(Result)
      .should('be.visible')
  });
  
  
  it('Types and submits the from directly', () => {
    cy.get('@searchField')
    .type(SearchTerm)
    cy.get('form').submit()

    cy.wait('@getSearchResults')

    cy.get(Result)
    .should('be.visible')
  });
});