/// <reference types="Cypress"/>

describe("User Dashboard Tests", () => {
  beforeEach(() => {
    // Use cy.session to cache the login session
    cy.session("citizen-session", () => {
      cy.visit("http://localhost:5173/login");
      cy.get('[data-cy="email-input"]').type("samwels036@gmail.com");
      cy.get('[data-cy="password-input"]').type("@?6164Pesa2022");
      cy.get('[data-cy="login-btn"]').click();
      cy.url().should("contain", "/user/citizen"); // Ensure login was successful
    });

    // Visit the citizen dashboard after restoring the session
    cy.visit("http://localhost:5173/user/citizen");
  });

  it("Should show welcome message", () => {
    cy.contains("Hello, SAMUEL! 👋").should("be.visible");
  });

  it("Should display active polls, chat with AI", () => {
    cy.contains("Active Polls").should("be.visible");
    cy.contains("Chatbot Assistant").should("be.visible");
    cy.contains("Recent Reported Incidents").should("be.visible");
  });

  it("Report an incident", () => {
    cy.get("[data-cy='category-input']").select("Crime");
    cy.get("[data-cy='description-input']").type(
      "I want to report MPESA breakage by a notorious gang called Konfirm"
    );
    cy.get("[data-cy='location-input']").type("Nyeri");
    cy.get("[data-cy='media-input']").type("https://www.facebook.com/img5");
    cy.get('[data-cy="incident-btn"]').click();

    // Assert success message on reporting an incident
    cy.contains("Incident reported successfully").should("be.visible");
  });
});
