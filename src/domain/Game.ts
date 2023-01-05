export class Game {
	private player = "";

	play(x: number, y: number): string {
		if (this.player === "" || this.player === "O") {
			this.player = "X";

			return this.player;
		}
		this.player = "O";

		return this.player;
	}

	get nextPlayer(): string {
		if (this.player === "" || this.player === "O") {
			return "X";
		}

		return "O";
	}
}
