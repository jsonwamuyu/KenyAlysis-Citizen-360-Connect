/// <reference types="Cypress"/>

describe("Admin dashboard", () => {
  beforeEach(() => {
    cy.log("jysonmuchiri@gmail.com", "@?6164Pesa2022");
    cy.visit("/user/admin");
  });

  it("Should show welcome message", () => {
    cy.contains("Hello, JOHNSON MUCHIRI! 👋").should("be.visible");
  });
  it("Should allow admin to create a poll", () => {
    cy.get("data-cy=['poll-title']").type("Do you support the new helb model");
    cy.get('data-cy=["description"]').type(
      "We want your view on this issues. Your vote count"
    );
    cy.get("data-cy=['expiry-date']").select("03/11/2025");
    cy.get("data-cy=['poll-btn']").click();

    cy.contains("Poll created successfully").should("be.visible");
  });
});
