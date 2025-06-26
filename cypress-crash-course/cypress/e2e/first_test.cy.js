//NOTE USERNAME AND PASSWORD ARE BOTH 123

describe('Cypress Crash Course', () => {
  const email = '123';
  const password = '123'
  beforeEach(() => {
    cy.visit('')
  })


  // Test 1: Visiting the Login Page
    it('should load the login page correctly', () => {
      // Use cy.visit() to load your app. Use cy.get() to check if the username,
      // Description:
      // password, and login button are present and visible.
      cy.get('.login-form')
      cy.get('#usernameInput')
      cy.get('#passwordInput')
      cy.get('#loginBtn')
        // This helps you get used to selecting elements and making simple checks.
    });

    // Test 2: Login with valid credentials
    it('should log in with valid credentials', () => {

      // Description:
      // Visit the login page.
      // Use cy.get() to select the username and password fields and type in valid credentials (both 123).
      // Use cy.get() to select and click the login button.
      cy.login(email, password)

      // Use cy.get() or cy.contains() to check if the posts table appears,
      // or confirm that you have successfully logged in.
      cy.get('#table')
    });

    // Test 3: Login with invalid credentials
    it('should show error message with invalid credentials', () => {
      // Description:
      // Visit the login page.
      // Enter an invalid username or password.
      cy.get('#loginBtn').click()

      // Click the login button.
      // Use cy.get() or cy.contains() to check if the error toast message appears.
      // Use cy.should() to confirm that the error message is visible.
      cy.get('.error-toast').should('be.visible')
      cy.get('.error-toast').should('contain.text', 'De gegevens zijn onjuist')

      cy.get('.error-toast', {timeout: 2100}).should('not.exist')

    });

    // Test 4: Posts table loads and has content after login
    it('should display posts table with data after login', () => {
      // Description:
      // Log in with valid credentials.
      cy.login(email, password)
      // Use cy.get() to select the posts table and check that it's visible.
      cy.get('#table')


      // Use cy.get() to select a specific row or cell by its id or selector.
      cy.get('#idItem0')
      cy.get('#titleItem0')
      cy.get('#bodyItem0')
      cy.get('#userIdItem0')

      // Use .should() to check the content of a specific row or cell.
      // (For example, check if the first row contains the expected title or userId.)
      cy.get('#titleItem0').should('contain.text', 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit')

    });

    // Test 5: Adding a new post updates the table
    it('should add a new post and display it in the table', () => {
      // Description:
      // Log in with valid credentials.
      // Use cy.get() to select the input fields for title and body for the new post.
      cy.login(email, password)

      // Use .type() to enter new data.
      cy.get('[data-cy=title-input]').type('inputdata')
      cy.get('[data-cy=body-input]').type('bodydata')

      // Use cy.get() to select and click the submit button.
      cy.get('#submitBtn').click()
      // Use cy.get() to check if the table updates and the new post appears as the last row or in the correct spot.

      // Use .should() to check the content of the new row.

      cy.get('#titleItem10').should('contain.text', 'inputdata')
      cy.get('#bodyItem10').should('contain.text', 'bodydata')


    });

    // Test 6: Toast message appears and disappears
    it.skip('should hide toast message after a few seconds', () => {
        // Description:
        // Trigger a login with invalid credentials to make the error toast appear.
        // Use cy.get() to check that the toast message is visible.
        // Use cy.wait() for the timeout period (e.g., 3000ms).
        // Use cy.get() and .should('not.exist') to confirm the toast message disappears.

        // Test combined whit test3
    });

    // Test 7: Post form input validation
    it.skip('should validate post form inputs', () => {
        // Description:
        // Log in with valid credentials.
        // Try to submit the post form with empty fields.
        // Use cy.get() or cy.contains() to check if a validation error message is shown,
        // or if the submit button is disabled.
        // Try to submit with only one field filled in and check for validation feedback.
    });

    // Test 8: Intercept and mock posts API
    it.skip('should intercept and mock posts API', () => {
        // Description:
        // Use cy.intercept() to mock the GET request to the posts API
        // and provide your own fixture or static array of data.
        // Log in to trigger the table load.
        // Use cy.get() to check if the table displays the mocked data (check specific values).
        // This test helps you practice working with network requests and fixtures in Cypress.
    });

    // Test 9: Advanced table checks (Challenge)
    it.skip('should get a specific row and check all cell values', () => {
        // Description:
        // Log in with valid credentials.
        // Use cy.get() to select a specific row (e.g., second row).
        // Use cy.get() to select each cell in that row (e.g., by id="titleItem1", etc).
        // Use .should() to check the exact text or value for each cell.
        // This requires combining selectors, chaining, and different assertions.
    });
});
