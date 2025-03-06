/// <reference types="Cypress" />

describe("Admin dashboard", () => {
  beforeEach(() => {
    // Use cy.session to cache the login session
    cy.session("admin-session", () => {
      cy.visit("http://localhost:5173/login");
      cy.get('[data-cy="email-input"]').type("jysonmuchiri@gmail.com");
      cy.get('[data-cy="password-input"]').type("@?6164Pesa2022");
      cy.get('[data-cy="login-btn"]').click();
      cy.url().should("contain", "/user/admin"); // Ensure login was successful
    });

    // Visit the admin dashboard after restoring the session
    cy.visit("http://localhost:5173/user/admin");
  });

  it("Should show welcome message", () => {
    cy.contains("Welcome back! We are glad to have you.").should("be.visible");
  });

  it("Should allow admin to create a poll", () => {
    cy.get('[data-cy="poll-title"]').type("Do you support the new HELB model?");
    cy.get('[data-cy="description"]').type(
      "We want your view on this issue. Your vote counts."
    );
    cy.get('[data-cy="expiry-date"]').type("2025-03-11"); // Adjust date format if necessary
    cy.get('[data-cy="poll-btn"]').click();

    cy.contains("Poll created successfully").should("be.visible");
  });
});
