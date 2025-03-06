/// <reference types="Cypress"/>

describe("Authenticate user", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/login");
  });

  it("Should visit login page", () => {
    cy.contains("Login").should("be.visible");
  });

  it("Should allow user to login", () => {
    cy.get('[data-cy="email-input"]').type("jysonmuchiri@gmail.com");
    cy.get('[data-cy="password-input"]').type("@?6164Pesa2022");
    cy.get('[data-cy="login-btn"]').click();

    // Check whether user redirected to admin dashboard
    cy.url().should("include", "/user/admin");
  });

  it("Should display error for empty fields", () => {
    cy.get('[data-cy="login-btn"]').click();

    cy.contains("All fields are required").should("be.visible");
  });

  it("Should display error for invalid credentials", () => {
    cy.get('[data-cy="email-input"]').type("jysonmuchiri@gmail.com");
    cy.get('[data-cy="password-input"]').type("Passw0rd123");
    cy.get('[data-cy="login-btn"]').click();

    // Assert error if credentials do not match
    cy.contains("Invalid credentials").should("be.visible");
  });

  it("Should display error for invalid email format", () => {
    cy.get('[data-cy="email-input"]').type("invalid-email");
    cy.get('[data-cy="password-input"]').type("@?6164Pesa2022");
    cy.get('[data-cy="login-btn"]').click();

    cy.contains("Please enter a valid email address.").should("be.visible");
  });

  it("Should handle forgot password link", () => {
    cy.get('[data-cy="forgot-password"]').click();

    // Check if forgot password page is loaded
    cy.url().should("include", "/forgot-password");
  });

  it("Should show signup link, when clicked should load the page", () => {
    cy.get("[data-cy='signup-link']").click();
    // assert signup page loaded
    cy.url().should("include", "/signup");
  });
});
