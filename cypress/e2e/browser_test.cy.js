describe('Cross-browser testing', () => {
    it('should load the website', () => {
        cy.visit('http://localhost:5173');
        cy.get('body').should('be.visible');
        cy.title().should('eq', 'ProFinder');
        cy.get('button[type="submit"].search-button').should('exist');
        // Add more checks as needed
    });
});
  