import { fireEvent, render, screen } from "@testing-library/react";

import { App } from "../src/App";

describe("Tic Tac Toe App", () => {
	describe("when game starts", () => {
		test("Should display App name", () => {
			render(<App />);

			const heading = screen.getByText("Tic Tac Toe");

			expect(heading).toBeInTheDocument();
		});
		test("Should display 9 x 9 board", () => {
			render(<App />);

			const gameTiles = screen.getAllByRole("cell");

			expect(gameTiles.length).toBe(9);
		});

		test("Should display 3 rows with 3 tiles each", () => {
			render(<App />);

			const rows = screen.getAllByRole("row");

			expect(rows.length).toBe(3);
		});

		test("tiles should be empty", () => {
			render(<App />);

			const gameTiles = screen.getAllByRole("cell");

			gameTiles.forEach((tile) => {
				expect(tile.textContent).toBe("");
			});
		});

		test("Should display player X turn", () => {
			render(<App />);

			const playerTurn = screen.getByRole("textbox");

			expect(playerTurn.textContent).toBe("Player X's turn");
		});
	});

	describe("after the first move", () => {
		test("Should display player O turn", () => {
			render(<App />);

			const playerTurn = screen.getByRole("textbox");
			const gameTiles = screen.getAllByRole("cell");

			fireEvent.click(gameTiles[0]);

			expect(playerTurn.textContent).toBe("Player O's turn");
		});
	});
});
