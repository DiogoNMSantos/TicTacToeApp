type Coordinate = { x: number; y: number };
type Play = { player: string; coordinate: Coordinate };

export class Game {
	private player = "";
	private readonly plays: Play[] = [];

	winner(): string {
		const topRow = this.plays.filter((p) => p.coordinate.x === 0);
		if (topRow.length === 3 && topRow.every((p) => p.player === topRow[0].player)) {
			return topRow[0].player;
		}

		return "";
	}

	play(xCord: number, yCord: number): string {
		if (this.plays.find((value) => value.coordinate.x === xCord && value.coordinate.y === yCord)) {
			throw new Error("Position already played");
		}

		if (this.player === "" || this.player === "O") {
			this.player = "X";

			this.plays.push({ player: this.player, coordinate: { x: xCord, y: yCord } });

			return this.player;
		}
		this.player = "O";

		this.plays.push({ player: this.player, coordinate: { x: xCord, y: yCord } });

		return this.player;
	}

	get nextPlayer(): string {
		if (this.player === "" || this.player === "O") {
			return "X";
		}

		return "O";
	}
}
