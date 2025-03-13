describe("Test Signup functionalities", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/signup");
  });
  it("Should have signup header", () => {
    cy.contains("Signup").should("be.visible");
  });

  // Additional tests

  it("Should display error for empty fields", () => {
    cy.get('[data-cy="signup-btn"]').click();

    cy.contains("All fields are required").should("be.visible");
  });

  it("Should display error for invalid email format", () => {
    cy.get("[data-cy='username-input']").type("JOY SNOW");
    cy.get('[data-cy="email-input"]').type("invalid-email");
    cy.get('[data-cy="password-input"]').type("password123");
    cy.get('[data-cy="signup-btn"]').click();

    cy.contains("Please enter a valid email address.").should("be.visible");
  });

  it("Should have link to login page", () => {
    cy.contains("Already have an account?Login");
  });

  it("Should load login page when link to login is clicked", () => {
    cy.get('[data-cy="login-link"]').click();
    // assert url contains "/login"
    cy.url().should("contain", "/login");
  });

  it("Should display error for weak password", () => {
    cy.get('[data-cy="username-input"]').type("JOHNSON");
    cy.get('[data-cy="email-input"]').type("test@example.com");
    cy.get('[data-cy="password-input"]').type("short");
    cy.get('[data-cy="signup-btn"]').click();

    cy.contains("Password must be at least 8 characters long").should(
      "be.visible"
    );
  });

  it("Should throw an error when user tries to signup twice", () => {
    // First, ensure the user is signed up
    cy.get('[data-cy="username-input"]').type("TEST TWO");
    cy.get('[data-cy="email-input"]').type("test2@example.com");
    cy.get('[data-cy="password-input"]').type("@?6164Pesa2022");
    cy.get('[data-cy="signup-btn"]').click();

    // Attempt to signup again
    cy.reload();
    cy.get('[data-cy="username-input"]').type("TEST TWO");
    cy.get('[data-cy="email-input"]').type("test2@example.com");
    cy.get('[data-cy="password-input"]').type("@?6164Pesa2022");
    cy.get('[data-cy="signup-btn"]').click();

    cy.contains("User already exists.").should("be.visible");
  });
});
