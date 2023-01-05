import { fireEvent, render, screen } from "@testing-library/react";

import { Game } from "../../../src/domain/Game";
import { Board } from "../../../src/sections/board/Board";

describe("Tic Tac Toe Board", () => {
	test("Should place player token on selected tile", () => {
		const game = new Game();
		render(
			<Board
				game={game}
				playedCallBack={jest.fn()}
				invalidPlayCallBack={jest.fn()}
				winnerCallBack={jest.fn()}
			/>
		);

		const gameTiles = screen.getAllByRole("cell");

		expect(gameTiles[0].textContent).toBe("");

		fireEvent.click(gameTiles[0]);

		expect(gameTiles[0].textContent).toBe("X");
	});

	test("Should notify when there is an error", () => {
		const onError = jest.fn();

		const game = new Game();
		render(
			<Board
				game={game}
				playedCallBack={jest.fn()}
				invalidPlayCallBack={onError}
				winnerCallBack={jest.fn()}
			/>
		);

		const gameTiles = screen.getAllByRole("cell");

		expect(gameTiles[0].textContent).toBe("");

		fireEvent.click(gameTiles[0]);
		fireEvent.click(gameTiles[0]);

		expect(onError).toHaveBeenCalledWith("Position already played");
	});

	test("Should notify that there has been a winner", () => {
		const onWin = jest.fn();

		const game = new Game();
		render(
			<Board
				game={game}
				playedCallBack={jest.fn()}
				invalidPlayCallBack={jest.fn()}
				winnerCallBack={onWin}
			/>
		);

		const gameTiles = screen.getAllByRole("cell");

		expect(gameTiles[0].textContent).toBe("");

		fireEvent.click(gameTiles[0]);
		fireEvent.click(gameTiles[3]);
		fireEvent.click(gameTiles[1]);
		fireEvent.click(gameTiles[4]);
		fireEvent.click(gameTiles[2]);

		expect(onWin).toHaveBeenCalledWith("X");
	});

	test("Should notify that players can not continue to play", () => {
		const onError = jest.fn();

		const game = new Game();
		render(
			<Board
				game={game}
				playedCallBack={jest.fn()}
				invalidPlayCallBack={onError}
				winnerCallBack={jest.fn()}
			/>
		);

		const gameTiles = screen.getAllByRole("cell");

		expect(gameTiles[0].textContent).toBe("");

		fireEvent.click(gameTiles[0]);
		fireEvent.click(gameTiles[5]);
		fireEvent.click(gameTiles[1]);
		fireEvent.click(gameTiles[3]);
		fireEvent.click(gameTiles[2]);
		fireEvent.click(gameTiles[7]);

		expect(onError).toHaveBeenCalledWith("Can not continue to play");
	});
});
