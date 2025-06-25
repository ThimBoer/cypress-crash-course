//NOTE USERNAME AND PASSWORD ARE BOTH 123.

describe('Cypress Crash Course', () => {
    // Test 1: Test login functionality with valid credentials
    it('should log in with valid credentials', () => {
        // Step 1: Use cy.visit() to open the login page of your app.
        // Step 2: Use cy.get() to select the username and password fields, and type valid credentials with .type().
        // Step 3: Use cy.get() to select the login button and click it with .click().
        // Step 4: Use cy.contains() or cy.url() to check if the user is redirected or sees a success message.
    });

    // Test 2: Test login functionality with invalid credentials
    it('should show error message with invalid credentials', () => {
        // Step 1: Visit the login page.
        // Step 2: Enter an invalid username or password.
        // Step 3: Click the login button.
        // Step 4: Use cy.contains() to check if an error message is displayed.
    });

    // Test 3: Test if the posts table loads correctly
    it('should display posts table after login', () => {
        // Step 1: Log in using valid credentials (you can repeat the login steps or use a custom command).
        // Step 2: Use cy.get() to select the posts table.
        // Step 3: Use .should('be.visible') to check if the table is visible.
        // Step 4: Optionally, use cy.get() and .should() to check if the table contains expected data.
    });

    // Test 4: Test adding a new post
    it('should add a new post and display it in the table', () => {
        // Step 1: Log in.
        // Step 2: Use cy.get() to select the form fields for a new post and fill them in.
        // Step 3: Submit the form.
        // Step 4: Use cy.get() to check if the new post appears in the posts table.
    });

    // Test 5: Test toast message disappears after timeout
    it('should hide toast message after a few seconds', () => {
        // Step 1: Trigger an action that shows a toast message (e.g., add a post).
        // Step 2: Use cy.get() to check if the toast message appears.
        // Step 3: Use cy.wait() to wait for the timeout duration.
        // Step 4: Use cy.get() and .should('not.exist') to check if the toast message disappears.
    });

    // Test 6: Test input validation for post form
    it('should validate post form inputs', () => {
        // Step 1: Log in.
        // Step 2: Try to submit the post form with empty or invalid inputs.
        // Step 3: Use cy.get() or cy.contains() to check for validation error messages.
    });

    // Test 7: Test intercepting network requests
    it('should intercept and mock posts API', () => {
        // Step 1: Use cy.intercept() to mock the API endpoint that returns posts.
        // Step 2: Log in and navigate to the posts page.
        // Step 3: Use cy.get() to check if the UI displays the mocked data you provided in cy.intercept().
    });
});
