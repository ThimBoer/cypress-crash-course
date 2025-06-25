Cypress.Commands.add('showTable', (buttonId, tableId) => {
    cy.get(buttonId).click();
    cy.get(tableId).should('be.visible');
});

Cypress.Commands.add('login', (username, password, buttonId) => {
    cy.get('#usernameInput').type(username);
    cy.get('#passwordInput').type(password);
    cy.get('#loginBtn').click();
});