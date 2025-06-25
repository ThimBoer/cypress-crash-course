# Cypress Crash Course
Welcome! This guide is designed to help you learn Cypress.
---

## Getting Started

Follow these clear and straightforward steps to get your Angular application running and ready for testing with Cypress.

### **Step 1: Clone the Angular Application**

Clone the application's repository from GitHub:
```bash
git clone https://github.com/ThimBoer/cypress-crash-course.git
```
Navigate into the cloned repository directory:
```
cd <repository-folder>
```
Replace `<repository-folder>` with your repository’s actual name.

### **Step 2: Install Application Dependencies**

Install all required dependencies by running:
```bash
npm install
```

### **Step 3: Run the Angular Application**

Start your Angular application using:
```bash
ng serve
```
Your app should now be running locally and can usually be accessed at:
[http://localhost:4200]

### **Step 4: Install Cypress**

Open a new terminal window (keeping your app running in the original terminal) and run:
```bash
npm install cypress --save-dev
```
This installs Cypress specifically for development and testing purposes.

### **Step 5: Open Cypress Test Runner**

Launch the Cypress Test Runner with the command:
```bash
npx cypress open
```
This will open Cypress's interface, allowing you to easily manage and execute your tests.


## Tips && Tricks

### Visiting a Page (`cy.visit()`)
Loads a specific webpage within Cypress. In our Test we can reach at http://localhost:4200

**Example:**

```js
cy.visit('http://localhost:4200/')
```
**Tip:** 
In the cypress.config.ts it's possible to use a baseUrl, if we remove the // for the baseUrl. We can use relative paths (for example `/`) for local testing environments.
```js
cy.visit('/')
```
---

### Selecting Elements (`cy.get()`)

Used to find HTML elements on your page.

**Ways to select elements:**

* **By id**: `cy.get('#element-id')`
* **By data attributes**: `cy.get('[data-cy=submit-button]')`
* **By CSS class**: `cy.get('.button-class')`

**Recommended:** Use data attributes (`data-cy`) or use (`id`) for stable, reliable selections.

---

### Finding Text (`cy.contains()`)

Selects elements containing specific text.

**Example:**

```js
cy.contains('Username')
```

---

### Clicking Elements (`cy.click()`)

Clicks on an element you’ve selected.

**Example:**

```js
cy.get('[data-cy=login-btn]').click()
```

---

### Typing into Fields (`cy.type()`)

Simulates typing into input fields.

**Example:**

```js
cy.get('[data-cy=username]').type('myUser')
```

---

## Assertions (`.should()`)

Checks conditions to confirm elements behave as expected.

**Example:**

```js
cy.get('[data-cy=success-message]').should('be.visible')
```

**Common assertions include:**
* `'be.visible'` (element visible)
* `'have.text', 'Your Text'` (exact text match)
---

## Waiting for Elements
### Explicit Wait (`cy.wait()`)
Pauses test execution.
**Examples:**
```js
cy.wait(1000)
cy.wait('@getUser') // waits for a network request labeled "getUser"
```

**Tip:** Prefer waiting for specific events or network requests instead of fixed times for better reliability.

---

# Network Requests: `cy.intercept()` & Fixtures

## Intercepting Network Requests with `cy.intercept()`

`cy.intercept()` in Cypress allows you to catch and control network requests that your application makes during testing.  
You can use it to:

- **Mock API responses**: Return fake data instead of calling the real backend.
- **Observe and wait for requests**: Confirm that your app is making the right calls.

This makes your tests faster, more reliable, and independent of external APIs.

**Basic Example:**
```js
cy.intercept('GET', '/api/users', { fixture: 'users.json' }).as('getUsers');
```

Any GET request to /api/users will receive the static response from the users.json fixture.
.as('getUsers') lets you reference this interception elsewhere in your test (e.g., cy.wait('@getUsers')).

**Using Fixtures**
Fixtures are files (often JSON) containing static, fake data for use in your tests.
They live in the cypress/fixtures/ map.

Example fixture file: cypress/fixtures/user.json

{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com"
}

**Ways to use fixtures:**
To populate a form or use as mock API data.

To keep your tests consistent and predictable.

### Using Intercept and Fixtures Together
**You can combine both to fully mock API calls with static fixture data:**
Example:

cy.intercept('GET', '/api/check-user', { fixture: 'user.json' }).as('checkUser');
cy.visit('/login');
cy.wait('@checkUser'); // Waits for the intercepted call
Now, every time your app requests /api/check-user, it will always receive the data from user.json.

**Summary**
cy.intercept(): Catches and controls network requests; lets you mock or observe them.
Fixture: Static data file (like JSON) used for consistent test data and mocking.
Together: Use interceptors to return fixture data for API calls, making your tests stable and predictable.

## Organizing Tests
Use `describe()` to group tests and `it()` to define individual test cases clearly.

**Example:**

```js
describe('Login Tests', () => {
    it('should log in successfully', () => {
        cy.visit('/')
        cy.get('[data-cy=username]').type('user')
        cy.get('[data-cy=password]').type('pass')
        cy.get('[data-cy=login-button]').click()
    })
})
```
---

## Creating Custom Commands
Imagine that everyone has to write this code:
```js
cy.get('[data-cy=username]').type('user')
        cy.get('[data-cy=password]').type('pass')
        cy.get('[data-cy=login-button]').click()
```
This would cause a lot of duplicate code, Cypress has a way to prevent this: which are Commands.
Simplify repeated tasks with reusable commands.

**Example:**

```js
Cypress.Commands.add('login', (username, password) => {
    cy.get('[data-cy=username]').type(username)
    cy.get('[data-cy=password]').type(password)
    cy.get('[data-cy=login-button]').click()
})
```
Now the code is created once, and the developer/tester can use it like this: 

```js
cy.login('123', '123')
```

---

## Helpful Tips
* **Aliasing (`.as()`)**:
  ```js
  cy.get('[data-cy=submit-button]').as('submitBtn')
  cy.get('@submitBtn').click()
  ```

* **Debugging**:

  ```js
  cy.get('[data-cy=username]').debug()
  cy.pause()
  ```

* Cypress automatically records videos and screenshots for debugging.

---

## Common Pitfalls (Gotchas)

* **Avoid fixed `cy.wait()` times** unless necessary.
* Cypress commands retry automatically—no need for explicit loops.
* Mixing Cypress commands with regular JavaScript promises can lead to issues—use Cypress commands consistently for reliable tests.
---

Happy Testing!
