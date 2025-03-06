/// <reference types="Cypress"/>

describe("Citizen dashboard testing", () => {
  beforeEach(() => {
    cy.login("samwels036@gmail.com", "@?6164Pesa2022");
    cy.visit("/user/citizen");
  });

  it("Should display active polls, chat with AI", () => {
    cy.contains("Active Polls").should("be.visible");
    cy.contains("Chatbot Assistant").should("be.visible");
    cy.contains("Recent Reported Incidents").should("be.visible");
  });

  it("Should allow voting only once", () => {
    cy.get("button").contains("Vote Now").first().click();
    cy.contains("Already Voted").should("be.visible");
  });
  it("Should allow reporting incident", () => {
    cy.get('data-cy=["category"]').select("Corruption");
    cy.get("data-cy=['description']").type(
      "Am reporting a corruption case today"
    );
    cy.get("data-cy=['location']").type("Kisumu");
    cy.get("data-cy=['media-url']").type("https://www.facebook.com/img-one");
    cy.get("button").contains("Report Incident").click();

    cy.contains("Incident reported successfully").should("be.visible");
  });
});
