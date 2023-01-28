describe("Tic Tac Toe app", () => {
	it("should display app name", () => {
		cy.visit("/");
		cy.findByRole("heading", { name: /Tic Tac Toe Diogo/i }).should("exist");
	});

	it("should display play's x turn", () => {
		cy.visit("/");
		cy.findByRole("textbox").should("exist");
	});

	it("should display board", () => {
		cy.visit("/");
		cy.findAllByRole("row").should("exist");
	});

	it("should display 3 rows", () => {
		cy.visit("/");
		cy.findAllByRole("row").should("have.length", 3);
	});

	it("should have nine tiles", () => {
		cy.visit("/");
		cy.findAllByRole("cell").should("have.length", 9);
	});

	it("should have empty tiles", () => {
		cy.visit("/");
		cy.findAllByRole("cell").should("have.text", "");
	});

	it("After the first move should display player O turn", () => {
		cy.visit("/");
		cy.findByRole("textbox").should("have.text", "Player X's turn");
		cy.findAllByRole("cell").first().click();
		cy.findByRole("textbox").should("have.text", "Player O's turn");
	});

	it("displays position already played when player plays on a played position", () => {
		cy.visit("/");
		cy.findAllByRole("cell").first().click();
		cy.findAllByRole("cell").first().click();
		cy.findByRole("status").should("have.text", "Position already played");
	});

	it("Should display player X has won", () => {
		cy.visit("/");
		cy.findAllByRole("cell").eq(0).click();
		cy.findAllByRole("cell").eq(0).should("have.text", "X");
		cy.findAllByRole("cell").eq(5).click();
		cy.findAllByRole("cell").eq(5).should("have.text", "O");
		cy.findAllByRole("cell").eq(3).click();
		cy.findAllByRole("cell").eq(3).should("have.text", "X");
		cy.findAllByRole("cell").eq(4).click();
		cy.findAllByRole("cell").eq(4).should("have.text", "O");
		cy.findAllByRole("cell").eq(6).click();
		cy.findAllByRole("cell").eq(6).should("have.text", "X");
		cy.findByRole("status").should("have.text", "Player X wins");
	});
});
