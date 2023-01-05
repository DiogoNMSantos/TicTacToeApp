import { useState } from "react";

import styles from "./App.module.scss";
import { Game } from "./domain/Game";
import { Board } from "./sections/board/Board";

export function App() {
	const [ticTacToeGame, _] = useState<Game>(new Game());
	const [nextPlayer, setNextPlayer] = useState<string>(ticTacToeGame.nextPlayer);
	const [status, setStatus] = useState<string>("");

	const played = () => {
		setNextPlayer(ticTacToeGame.nextPlayer);
	};
	const playedError = (message: string) => {
		setStatus(message);
	};

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	const wins = (winner: string) => {
		setStatus(`Player ${winner} wins`);
	};

	return (
		<>
			<section className={styles.title}>
				<h1>Tic Tac Toe</h1>
			</section>
			<section>
				<h2 className={styles.display} role="textbox">
					Player <span>{nextPlayer}</span>'s turn
				</h2>
			</section>
			<Board
				game={ticTacToeGame}
				playedCallBack={played}
				invalidPlayCallBack={playedError}
				winnerCallBack={wins}
			/>
			;
			<section>
				<h3 className={styles.display} role="status">
					{status}
				</h3>
			</section>
		</>
	);
}
