/// <reference types="Cypress"/>

describe("Test government official page", () => {
  
  beforeEach(() => {
    // Use cy.session to cache the login session
    cy.session("citizen-session", () => {
      cy.visit("http://localhost:5173/login");
      cy.get('[data-cy="email-input"]').type("cindywamuyu@gmail.com");
      cy.get('[data-cy="password-input"]').type("@?6164Pesa2022");
      cy.get('[data-cy="login-btn"]').click();
      cy.url().should("contain", "/user/gvt-official"); // Ensure login was successful
    });

    // Visit the citizen dashboard after restoring the session
    cy.visit("http://localhost:5173/user/gvt-official");
  });


  it("Should show welcome message", () => {
    cy.contains("Hello, CINDY WAMUYU! 👋").should("be.visible");
  });
  // it("Should allow filtering of incidents", () => {
  //   cy.get("data-cy=['filter']").select("Resolved");
  //   cy.contains("There are incidents reported.").should("be.visible");
  // });
});
