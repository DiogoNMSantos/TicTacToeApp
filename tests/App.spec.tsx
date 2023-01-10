import { fireEvent, render, screen } from "@testing-library/react";

import { App } from "../src/App";

describe("Tic Tac Toe app", () => {
	test("should display app name", () => {
		render(<App />);

		const heading = screen.getByText("Tic Tac Toe Diogo");

		expect(heading).toBeInTheDocument();
	});

	test("should display play's x turn", () => {
		render(<App />);

		const playTurn = screen.getByRole("textbox");

		expect(playTurn.textContent).toBe("Player X's turn");
	});

	test("should display a 9 by 9 board", () => {
		render(<App />);

		const rows = screen.getAllByRole("row");

		expect(rows.length).toBe(3);
	});

	test("should display 3 rows with 3 tiles each", () => {
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

describe("game status", () => {
	test("players can not play in a position that has been already played", () => {
		render(<App />);

		const gameStatus = screen.getByRole("status");
		const gameTiles = screen.getAllByRole("cell");

		fireEvent.click(gameTiles[0]);
		fireEvent.click(gameTiles[0]);

		expect(gameStatus.textContent).toBe("Position already played");
	});
});
