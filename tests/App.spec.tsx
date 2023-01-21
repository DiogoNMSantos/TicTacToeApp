import { fireEvent, render, screen } from "@testing-library/react";

import { App } from "../src/App";
import { TicTacToeGameContextProvider } from "../src/hooks/TicTacToeGameContext";

describe("Tic Tac Toe app", () => {
	test("should display app name", () => {
		render(
			<TicTacToeGameContextProvider>
				<App />
			</TicTacToeGameContextProvider>
		);

		const heading = screen.getByText("Tic Tac Toe Diogo");

		expect(heading).toBeInTheDocument();
	});

	test("should display play's x turn", () => {
		render(
			<TicTacToeGameContextProvider>
				<App />
			</TicTacToeGameContextProvider>
		);

		const playTurn = screen.getByRole("textbox");

		expect(playTurn.textContent).toBe("Player X's turn");
	});

	test("should display a 9 by 9 board", () => {
		render(
			<TicTacToeGameContextProvider>
				<App />
			</TicTacToeGameContextProvider>
		);

		const rows = screen.getAllByRole("row");

		expect(rows.length).toBe(3);
	});

	test("should display 3 rows with 3 tiles each", () => {
		render(
			<TicTacToeGameContextProvider>
				<App />
			</TicTacToeGameContextProvider>
		);

		const rows = screen.getAllByRole("row");

		expect(rows.length).toBe(3);
	});

	test("tiles should be empty", () => {
		render(
			<TicTacToeGameContextProvider>
				<App />
			</TicTacToeGameContextProvider>
		);

		const gameTiles = screen.getAllByRole("cell");

		gameTiles.forEach((tile) => {
			expect(tile.textContent).toBe("");
		});
	});
});

describe("after the first move", () => {
	test("Should display player O turn", () => {
		render(
			<TicTacToeGameContextProvider>
				<App />
			</TicTacToeGameContextProvider>
		);

		const playerTurn = screen.getByRole("textbox");
		const gameTiles = screen.getAllByRole("cell");

		fireEvent.click(gameTiles[0]);

		expect(playerTurn.textContent).toBe("Player O's turn");
	});
});

describe("game status", () => {
	test("players can not play in a position that has been already played", () => {
		render(
			<TicTacToeGameContextProvider>
				<App />
			</TicTacToeGameContextProvider>
		);

		const gameStatus = screen.getByRole("status");
		const gameTiles = screen.getAllByRole("cell");

		fireEvent.click(gameTiles[0]);
		fireEvent.click(gameTiles[0]);

		expect(gameStatus.textContent).toBe("Position already played");
	});
});

describe("game winning", () => {
	test("Should notify when there is a winner", () => {
		render(
			<TicTacToeGameContextProvider>
				<App />
			</TicTacToeGameContextProvider>
		);

		const gameStatus = screen.getByRole("status");
		const gameTiles = screen.getAllByRole("cell");

		fireEvent.click(gameTiles[0]);
		fireEvent.click(gameTiles[1]);
		fireEvent.click(gameTiles[3]);
		fireEvent.click(gameTiles[4]);
		fireEvent.click(gameTiles[6]);

		expect(gameStatus.textContent).toBe("Player X wins");
	});
});
