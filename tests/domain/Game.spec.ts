import { Game } from "../../src/domain/Game";

describe("Tic tac toe game", () => {
	test("Should alternate players after a move has been made", () => {
		const game = new Game();

		let player = game.play(0, 0);

		expect(player).toBe("X");

		player = game.play(1, 1);

		expect(player).toBe("O");
	});

	test("Should indicate X as next player when game starts", () => {
		const game = new Game();

		expect(game.nextPlayer).toBe("X");
	});

	test("Should indicate O as next player after X plays", () => {
		const game = new Game();

		game.play(0, 0);

		expect(game.nextPlayer).toBe("O");
	});
});
