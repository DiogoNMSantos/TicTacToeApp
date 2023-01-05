import { fireEvent, render, screen } from "@testing-library/react";

import { Game } from "../../../src/domain/Game";
import { Board } from "../../../src/sections/board/Board";

describe("Tic Tac Toe Board", () => {
	test("Should place player token on selected tile", () => {
		const game = new Game();
		render(<Board game={game} playedCallBack={jest.fn()} />);

		const gameTiles = screen.getAllByRole("cell");

		expect(gameTiles[0].textContent).toBe("");

		fireEvent.click(gameTiles[0]);

		expect(gameTiles[0].textContent).toBe("X");
	});
});
