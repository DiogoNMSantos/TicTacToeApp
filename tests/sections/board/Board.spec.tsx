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
});
