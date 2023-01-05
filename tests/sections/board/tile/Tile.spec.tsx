import { fireEvent, render, screen } from "@testing-library/react";

import { ClickEvent, Tile } from "../../../../src/sections/board/tile/Tile";

describe("Board tiles", () => {
	test("Should place player token on selected tile", () => {
		const onClick = jest.fn((clickEvent: ClickEvent) => {
			clickEvent.updatePlayerOnTileCallBack("X");
		});

		render(<Tile x={0} y={0} onTileClickedCallBack={onClick} />);

		const gameTile = screen.getByRole("cell");

		expect(gameTile.textContent).toBe("");

		fireEvent.click(gameTile);

		expect(onClick).toHaveBeenCalledWith({
			coordinate: { x: 0, y: 0 },
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			updatePlayerOnTileCallBack: expect.any(Function),
		});

		expect(gameTile.textContent).toBe("X");
	});
});
