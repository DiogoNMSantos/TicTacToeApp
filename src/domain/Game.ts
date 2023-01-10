type Coordinate = { x: number; y: number };
type Play = { player: string; coordinate: Coordinate };

class Board {
	private readonly plays: Play[] = [];

	// Query method
	get topRow() {
		return this.plays.filter((p) => p.coordinate.x === 0);
	}

	// Command method
	addPlay(xCord: number, yCord: number, player: string) {
		if (this.plays.find((value) => value.coordinate.x === xCord && value.coordinate.y === yCord)) {
			throw new Error("Position already played");
		}

		this.plays.push({ player, coordinate: { x: xCord, y: yCord } });
	}
}

export class Game {
	private player = "";
	private readonly board = new Board();

	winner(): string {
		const topRow = this.board.topRow;

		if (topRow.length === 3 && topRow.every((p) => p.player === topRow[0].player)) {
			return topRow[0].player;
		}

		return "";
	}

	// Command method
	play(xCord: number, yCord: number): string {
		if (this.winner() !== "") {
			throw new Error("Can not continue to play");
		}

		this.player = this.nextPlayer;

		this.board.addPlay(xCord, yCord, this.player);

		return this.player;
	}

	// Query method
	get nextPlayer(): string {
		if (this.player === "" || this.player === "O") {
			return "X";
		}

		return "O";
	}
}
