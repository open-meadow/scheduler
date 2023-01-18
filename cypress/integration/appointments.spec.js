describe("Appointments", () => {
  // reset database, start webpage and check if it is loading
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
    cy.visit("/");
    cy.contains("[data-testid='day']", "Monday");
  });

  xit("should book an interview", () => {
    // open appointment form
    cy.get("[alt=Add]").first().click();

    // add details and click save
    cy.get('[data-testid="student-name-input"]').type("Lydia Miller-Jones");
    cy.get("[alt='Sylvia Palmer']").click();
    cy.contains("Save").click();
    
    // check if new appointment shows up
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  xit("should edit an interview", () => {
    // open appointment form
    cy.get("[alt=Edit]").first().click({force: true});

    // change details and click save
    cy.get("[data-testid=student-name-input]").clear().type("Lydia Miller-Jones");
    cy.get("[alt='Tori Malcolm']").click();
    cy.contains("Save").click();
    
    // check if new appointment shows up
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  })

  it("should delete an interview", () => {
    // click delete
    cy.get("[alt=Delete]").first().click({force: true});

    // click confirm
    cy.contains('Confirm').click()
    
    // check deleting
    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");
    
    // check if new appointment does not show up
    cy.contains('.appointment__card--show', 'Archie Cohen').should("not.exist");
  })
});
