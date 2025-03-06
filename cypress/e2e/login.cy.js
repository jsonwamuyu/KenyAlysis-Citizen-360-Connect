/// <reference types="Cypress"/>

describe("Authenticate user", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("Should visit login page", () => {
    cy.contains("Login").should("be.visible");
  });

  it("Should allow user to login", () => {
    cy.get("data-cy=['email']").type("jysonmuchiri@gmail.com");
    cy.get("data-cy=[password]").type("@?6164Pesa2022");
    cy.get("data-cy=['login-btn']").click();

    // Check whether user redirected to admin dashboard
    cy.url().should("include", "/user/admin");
  });

  it("Should display error for empty fields", () => {
    cy.get('data-cy=["login-btn"]').click();

    cy.contains("All fields are required").should("be.visible");
  });

  it("Should display error for invalid credentials", () => {
    cy.get('data-cy=["email"]').type("jysonmuchiri@gmail.com");
    cy.get('data-cy=["password"]').type("Passw0rd123");
    cy.get('data-cy=["login-btn"]').click();

    // Assert error if credentials do not match
    cy.contains("Invalid credentials").should("be.visible");
  });
});
