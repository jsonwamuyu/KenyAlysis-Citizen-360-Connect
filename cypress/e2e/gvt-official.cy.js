/// <reference types="Cypress"/>

describe("Test government official page", () => {
  beforeEach(() => {
    cy.login("cindywamuyu@gmail.com", "@?6164Pesa2022");
    cy.visit("/user/gvt-official");
  });
  it("Should show welcome message", () => {
    cy.contains("Hello, CINDY WAMUYU! 👋").should("be.visible");
  });
  it("Should allow filtering of incidents", () => {
    cy.get("data-cy=['filter']").select("Resolved");
    cy.contains("There are incidents reported.").should("be.visible");
  });
});
