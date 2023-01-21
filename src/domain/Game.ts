export type Player = "X" | "O" | "";
export type CoordinateNumber = 0 | 1 | 2;

export type Coordinate = { x: CoordinateNumber; y: CoordinateNumber };
export type Play = { player: string; coordinate: Coordinate };

class Board {
	private readonly plays: Play[] = [];

	// Query method
	get topRow() {
		return this.plays.filter((p) => p.coordinate.x === 0);
	}

	// Command method
	addPlay(xCord: CoordinateNumber, yCord: CoordinateNumber, player: Player) {
		if (this.plays.find((value) => value.coordinate.x === xCord && value.coordinate.y === yCord)) {
			throw new Error("Position already played");
		}

		this.plays.push({ player, coordinate: { x: xCord, y: yCord } });
	}

	get isEmpty() {
		return this.plays.length === 0;
	}

	get NextPlayer() {
		if (this.plays.length === 0) {
			return "X";
		}

		if (this.plays[this.plays.length - 1].player === "X") {
			return "O";
		}

		if (this.plays[this.plays.length - 1].player === "O") {
			return "X";
		}
	}
}

export class Game {
	private readonly board = new Board();

	winner(): string {
		const topRow = this.board.topRow;

		if (topRow.length === 3 && topRow.every((p) => p.player === topRow[0].player)) {
			return topRow[0].player;
		}

		return "";
	}

	// Command method
	play(xCord: CoordinateNumber, yCord: CoordinateNumber): string {
		if (this.winner() !== "") {
			throw new Error("Can not continue to play");
		}

		const player = this.nextPlayer;
		this.board.addPlay(xCord, yCord, player);

		return player;
	}

	get isFirstMove(): boolean {
		return this.board.isEmpty;
	}

	// Query method
	get nextPlayer(): Player {
		return this.board.NextPlayer ? this.board.NextPlayer : "";
	}
}
