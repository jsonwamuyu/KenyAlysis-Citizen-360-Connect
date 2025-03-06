// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })



// Cypress.Commands.add("login", (email, password) => {
//     // Simulate user interaction with the login form
//     cy.visit("http://localhost:5173/login");
//     cy.get('[data-cy="email-input"]').type(email);
//     cy.get('[data-cy="password-input"]').type(password);
//     cy.get('[data-cy="login-btn"]').click();
  
//     // Alternatively, if you want to set the token directly (useful for API tests)
//     // cy.request("POST", "http://localhost:8080/api/auth/login", {
//     //   email,
//     //   password,
//     // }).then((response) => {
//     //   localStorage.setItem("token", response.body.token);
//     // });
//   });
  
  