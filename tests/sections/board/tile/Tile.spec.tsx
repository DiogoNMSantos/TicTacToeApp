import { fireEvent, render, screen } from "@testing-library/react";

import { Coordinate, CoordinateNumber, Player } from "../../../../src/domain/Game";
import {
	TicTacToePlayContext,
	TicTacToePlayContextState,
} from "../../../../src/hooks/TicTacToePlayContextProvider";
import { Tile } from "../../../../src/sections/board/tile/Tile";

describe("Board tiles", () => {
	test.each([
		[
			{ x: 0, y: 0 },
			{ xCord: 0, yCord: 0 },
		],
		[
			{ x: 0, y: 1 },
			{ xCord: 0, yCord: 1 },
		],
		[
			{ x: 0, y: 2 },
			{ xCord: 0, yCord: 2 },
		],
	])(
		"Should inform player coordinates when clicked",
		({ x, y }: { x: number; y: number }, { xCord, yCord }: { xCord: number; yCord: number }) => {
			const setPlayer: React.Dispatch<React.SetStateAction<Player | undefined>> = jest.fn();
			const setCoordinate: React.Dispatch<React.SetStateAction<Coordinate | undefined>> = jest.fn();

			const contextState: TicTacToePlayContextState = {
				player: "" as Player,
				coordinate: { x: x as CoordinateNumber, y: y as CoordinateNumber },
				setPlayer,
				setCoordinate,
			};

			render(
				<TicTacToePlayContext.Provider value={contextState}>
					<Tile x={x as CoordinateNumber} y={y as CoordinateNumber} />
				</TicTacToePlayContext.Provider>
			);

			const gameTile = screen.getByRole("cell");

			expect(gameTile.textContent).toBe("");

			fireEvent.click(gameTile);

			expect(setCoordinate).toHaveBeenCalledWith({ x: xCord, y: yCord });
		}
	);
});
