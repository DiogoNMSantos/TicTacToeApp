import { fireEvent, render, screen } from "@testing-library/react";

import { Coordinate, Game, Player } from "../../../src/domain/Game";
import {
	TicTacToeGameContext,
	TicTacToeGameContextProvider,
	TicTacToeGameContextState,
} from "../../../src/hooks/TicTacToeGameContext";
import {
	TicTacToePlayContext,
	TicTacToePlayContextProvider,
	TicTacToePlayContextState,
} from "../../../src/hooks/TicTacToePlayContextProvider";
import { Board } from "../../../src/sections/board/Board";

describe("Tic Tac Toe Board", () => {
	const setPlayer: React.Dispatch<React.SetStateAction<Player | undefined>> = jest.fn();
	const setCoordinate: React.Dispatch<React.SetStateAction<Coordinate | undefined>> = jest.fn();

	const playContextState: TicTacToePlayContextState = {
		player: "" as Player,
		coordinate: { x: 0, y: 0 },
		setPlayer,
		setCoordinate,
	};

	const onPlay = jest.fn();
	const onError = jest.fn();
	const onWin = jest.fn();

	const gameContestState: TicTacToeGameContextState = {
		nextPlayer: "",
		status: "",
		game: new Game(),
		onPlay,
		onError,
		onWin,
	};

	test("Should notify a play has been made", () => {
		render(
			<TicTacToeGameContext.Provider value={gameContestState}>
				<TicTacToePlayContext.Provider value={playContextState}>
					<Board />
				</TicTacToePlayContext.Provider>
			</TicTacToeGameContext.Provider>
		);

		const gameTiles = screen.getAllByRole("cell");

		expect(gameTiles[0].textContent).toBe("");

		fireEvent.click(gameTiles[0]);

		expect(onPlay).toHaveBeenCalled();
		expect(setPlayer).toHaveBeenCalledWith("X");
	});

	test("Should notify when there is an error", () => {
		render(
			<TicTacToeGameContext.Provider value={gameContestState}>
				<TicTacToePlayContext.Provider value={playContextState}>
					<Board />
				</TicTacToePlayContext.Provider>
			</TicTacToeGameContext.Provider>
		);

		const gameTiles = screen.getAllByRole("cell");

		expect(gameTiles[0].textContent).toBe("");

		fireEvent.click(gameTiles[0]);
		fireEvent.click(gameTiles[0]);

		expect(onError).toHaveBeenCalledWith("Position already played");
	});

	test.each([[0], [1], [2], [3], [4], [5], [6], [7], [8]])(
		"Should place player token in tile",
		(tile: number) => {
			render(
				<TicTacToeGameContextProvider>
					<TicTacToePlayContextProvider>
						<Board />
					</TicTacToePlayContextProvider>
				</TicTacToeGameContextProvider>
			);

			const gameTiles = screen.getAllByRole("cell");

			expect(gameTiles[tile].textContent).toBe("");

			fireEvent.click(gameTiles[tile]);

			expect(gameTiles[tile].textContent).toBe("X");
		}
	);

	test("Should alternate players on tiles", () => {
		render(
			<TicTacToeGameContextProvider>
				<TicTacToePlayContextProvider>
					<Board />
				</TicTacToePlayContextProvider>
			</TicTacToeGameContextProvider>
		);

		const gameTiles = screen.getAllByRole("cell");

		expect(gameTiles[0].textContent).toBe("");

		fireEvent.click(gameTiles[0]);

		expect(gameTiles[0].textContent).toBe("X");

		expect(gameTiles[1].textContent).toBe("");

		fireEvent.click(gameTiles[1]);

		expect(gameTiles[1].textContent).toBe("O");
	});

	test("Should not alternate players after invalid position played", () => {
		render(
			<TicTacToeGameContextProvider>
				<TicTacToePlayContextProvider>
					<Board />
				</TicTacToePlayContextProvider>
			</TicTacToeGameContextProvider>
		);

		const gameTiles = screen.getAllByRole("cell");

		expect(gameTiles[0].textContent).toBe("");

		fireEvent.click(gameTiles[0]);

		expect(gameTiles[0].textContent).toBe("X");

		fireEvent.click(gameTiles[0]);

		expect(gameTiles[0].textContent).toBe("X");

		fireEvent.click(gameTiles[1]);

		expect(gameTiles[1].textContent).toBe("O");
	});
});
