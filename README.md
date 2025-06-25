
# Cypress Crash Course

Welcome! This guide is designed to get you started with Cypress and help you write clear, and maintainable end-to-end tests.

---

## Table of Contents

- [Getting Started](#getting-started)
- [Folder Structure](#folder-structure)
- [Core Cypress Commands](#core-cypress-commands)
  - [cy.visit()](#cyvisit)
  - [cy.get()](#cyget)
  - [cy.contains()](#cycontains)
  - [cy.click()](#cyclick)
  - [cy.type()](#cytype)
  - [cy.should()](#cyshould)
- [Network Requests: Intercept and Fixtures](#network-requests-intercept-and-fixtures)
  - [cy.intercept()](#cyintercept)
  - [Fixtures](#fixtures)
  - [Combining Intercept and Fixtures](#combining-intercept-and-fixtures)
- [Organizing Tests](#organizing-tests)
- [Custom Commands](#custom-commands)
- [Helpful Tips](#helpful-tips)
- [Common Pitfalls](#common-pitfalls)
- [Happy Testing!](#happy-testing)

---

## Getting Started

Follow these steps to set up your Angular app and Cypress:

### 1. Clone the Angular Application

Clone the repository from GitHub:
```bash
git clone https://github.com/ThimBoer/cypress-crash-course.git
```
Navigate into the project folder:
```bash
cd <repository-folder>
```
Replace `<repository-folder>` with the actual folder name.

---

### 2. Install Application Dependencies

Install all necessary packages:
```bash
npm install
```

---

### 3. Run the Angular Application

Start your app locally:
```bash
ng serve
```
Your app should now be available at [http://localhost:4200](http://localhost:4200).

---

### 4. Install Cypress

Open a new terminal window (keep the app running) and install Cypress as a dev dependency:
```bash
npm install cypress --save-dev
```

---

### 5. Open Cypress Test Runner

Launch the Cypress UI:
```bash
npx cypress open
```
This opens the interface where you can run and manage your tests.

---

## Folder Structure

A typical Cypress folder structure looks like this:

```text
cypress/
├── downloads/         # Downloaded files during tests
├── e2e/               # Place for your end-to-end tests
│   └── [test files]
├── fixtures/          # Mock data for tests
│   └── example.json
└── support/           # Custom commands and utilities
    └── commands.js
```

---

## Core Cypress Commands

Below are the most commonly used Cypress commands, each explained with practical examples.

---

### `cy.visit()`

**Purpose:**  
Loads a web page into the Cypress browser for testing.  
This is usually the first command in a test—it sets up the starting state.

**Usage:**
```js
cy.visit('http://localhost:4200/')
```
- This opens the given URL.
- If you configure a `baseUrl` in `cypress.config.ts`, you can use relative URLs for simplicity:
  ```js
  // With baseUrl: 'http://localhost:4200'
  cy.visit('/') // Loads http://localhost:4200
  ```

**Best practice:**  
Start every test by visiting the page you want to test, so tests are isolated and repeatable.

---

### `cy.get()`

**Purpose:**  
Finds one or more elements on the page, so you can interact with them or make assertions.

**Usage:**
```js
cy.get('[data-cy=submit-button]')
```
- **By data attribute:**  
  `cy.get('[data-cy=submit-button]')` (recommended for stability)
- **By id:**  
  `cy.get('#element-id')` (also good)
- **By class:**  
  `cy.get('.some-class')`

**Tip:**  
Always use unique selectors (`data-cy`, `id`) to avoid flaky tests.
Also in the get there is a build in timeout option
```js
cy.get('[data-cy=submit-button]', { timeout: 1000 }) 
```
This checks every 50ms if the element is visible, but for one seconds long so it checks 20 times. If after 1 second the element still wasn't found the test fails
---

### `cy.contains()`

**Purpose:**  
Selects elements by their visible text content.  
Useful when you want to click a button or check for a specific label without knowing the selector.

**Usage:**
```js
cy.contains('Submit') // Finds element with text "Submit"
cy.contains('Log in').click() // Clicks the button/text
```
- Useful for language-independent or dynamic elements.
- Can be combined with `.get()` for specificity:
  ```js
  cy.get('.alert').contains('Error')
  ```

---

### `cy.click()`

**Purpose:**  
Simulates a user clicking on an element.

**Usage:**
```js
cy.get('[data-cy=login-btn]').click()
```
- You must select the element with `.get()` or `.contains()` first.
- Works for buttons, links, checkboxes, etc.

**Tip:**  
Chain `.click()` after `.get()` or `.contains()`.

---

### `cy.type()`

**Purpose:**  
Types (simulates keyboard input) into a form input, textarea, or similar element.

**Usage:**
```js
cy.get('[data-cy=username]').type('123')
cy.get('[data-cy=password]').type('123') //username and password are in this application the same
```
- Use for login forms, search bars, etc.
- You can type special keys with `{enter}`, `{tab}`, etc.

**Example:**
```js
cy.get('[data-cy=search]').type('Cypress{enter}')
```

---

### `cy.should()`

**Purpose:**  
**Makes assertions** about elements or data, and is the main way to check if your app is behaving as expected.

**Usage:**
```js
cy.get('[data-cy=success-message]').should('be.visible')
cy.get('[data-cy=username]').should('have.value', 'myUser')
cy.get('[data-cy=alert]').should('contain.text', 'Invalid credentials')
```

**Common assertions:**
- `'not.be.disabled'`: The element is enabled (clickable).
- `'be.visible'`: Element is visible to the user.
- `'not.exist'`: Element is not present.
- `'have.text', 'Your Text'`: Has exact text.
- `'contain.text', 'Partial'`: Contains partial text.
- `'have.value', 'something'`: Input or textarea value.
- `'be.checked'`: Checkbox or radio is checked.

**Example:**
```js
// Check that the login button is not disabled
cy.get('[data-cy=login-button]').should('not.be.disabled')

// Check that the success message is visible to the user
cy.get('[data-cy=success-message]').should('be.visible')

// Check that an error message is NOT present in the DOM
cy.get('[data-cy=error-message]').should('not.exist')

// Check that a welcome element has EXACTLY the expected text
cy.get('[data-cy=welcome-message]').should('have.text', 'Welcome, John!')

// Check that an alert contains PART of the expected text
cy.get('[data-cy=alert]').should('contain.text', 'Invalid credentials')

// Check that an input field has a specific value
cy.get('[data-cy=username]').should('have.value', 'myUser')

// Check that a checkbox is checked
cy.get('[data-cy=terms-checkbox]').should('be.checked')
```

**Tip:**  
Cypress automatically waits for assertions to pass (built-in retry-ability), so tests are stable.

---

## Network Requests: Intercept and Fixtures

Testing with real APIs can be flaky or slow. Cypress lets you mock network requests for stable, fast tests.

---

### `cy.intercept()`

**Purpose:**  
Intercepts and controls network (HTTP) requests in your app.  
You can mock responses or wait for requests to complete.

**Usage:**
```js
cy.intercept('GET', '/api/users', { fixture: 'users.json' }).as('getUsers')
```
- Any GET request to `/api/users` is intercepted and returns the data from `users.json` (from the `fixtures` folder).
- `.as('getUsers')` gives this interception a name for later reference (e.g., with `cy.wait('@getUsers')`).

**Why use it?**
- Tests run without depending on real APIs.
- Control responses (simulate errors, slow responses, etc).
- Confirm your app makes the right API calls.

**Example (wait for network call):**
```js
cy.wait('@getUsers')
```

---

### Fixtures

**Purpose:**  
Provide **static mock data** (usually in JSON) for your tests.

**Where:**  
Fixtures live in the `cypress/fixtures/` folder.

**Example:** `cypress/fixtures/user.json`
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com"
}
```

**How to use:**
- As a direct import in your test:
  ```js
  cy.fixture('user.json').then((user) => {
    cy.get('[data-cy=username]').type(user.name)
  })
  ```
- As a mock response with `cy.intercept()`.

**Why use fixtures?**
- Ensure consistent, repeatable tests.
- Avoid calling real APIs or databases.

---

### Combining Intercept and Fixtures

**Common pattern:**  
Mock an API endpoint by intercepting the request and responding with fixture data.

**Example:**
```js
cy.intercept('GET', '/api/check-user', { fixture: 'user.json' }).as('checkUser');
cy.visit('/login');
cy.wait('@checkUser'); // Ensures the request completed/mocked
```
- Now, whenever your app makes a GET request to `/api/check-user`, Cypress instantly returns the content of `user.json`.

---

## Organizing Tests

Group related tests together for readability and maintainability.

**Usage:**
```js
describe('Login Tests', () => {
  it('should log in successfully', () => {
    cy.visit('/')
    cy.get('[data-cy=username]').type('user')
    cy.get('[data-cy=password]').type('pass')
    cy.get('[data-cy=login-button]').click()
    cy.get('[data-cy=success-message]').should('be.visible')
  })
})
```
- `describe()` groups related tests.
- `it()` defines a single test case.

---

## Custom Commands

When you find yourself repeating sequences of Cypress commands, make a custom command for clarity and DRY code.

**How to add:**
In `cypress/support/commands.js`:
```js
Cypress.Commands.add('login', (username, password) => {
  cy.get('[data-cy=username]').type(username)
  cy.get('[data-cy=password]').type(password)
  cy.get('[data-cy=login-button]').click()
})
```

**How to use in your test:**
```js
cy.login('myUser', 'myPass')
```

**Why use custom commands?**
- Cleaner, shorter, and more maintainable tests.
- Changes only need to be made in one place.

---

## Helpful Tips

- **Aliasing (`.as()`)**: Give any command or selector a nickname for easy reuse.
  ```js
  cy.get('[data-cy=submit-button]').as('submitBtn')
  cy.get('@submitBtn').click()
  ```
- **Debugging**:
  ```js
  cy.get('[data-cy=username]').debug()
  cy.pause()
  ```
  These commands help you pause and inspect your tests in the Cypress browser.
- **Screenshots and Videos**: Cypress automatically records videos/screenshots on failures for easier debugging.

---

## Common Pitfalls

- **Avoid fixed waits (`cy.wait(1000)`)** unless absolutely necessary. Prefer waiting for events/network calls.
- Cypress commands are **asynchronous** and **chainable**—do not mix them with regular JS promises, as it can lead to unpredictable results.
- Cypress **retries commands and assertions** by default—no need for custom loops or repeated checks.
- Always use **unique selectors** (like `data-cy`) for element targeting—don’t rely on text, CSS classes, or deeply nested selectors.

---

## Happy Testing!
 
If you need more advanced examples or run into issues, check the [official Cypress documentation](https://docs.cypress.io/)!
---
