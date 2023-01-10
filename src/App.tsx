import { useState } from "react";

import styles from "./App.module.scss";
import { Game } from "./domain/Game";
import { Board } from "./sections/board/Board";

export function App() {
	const [ticTacToeGame, _] = useState<Game>(new Game());
	const [nextPLayer, setNextPlayer] = useState<string>(ticTacToeGame.nextPlayer);
	const [status, setStatus] = useState<string>("");

	const played = () => {
		setNextPlayer(ticTacToeGame.nextPlayer);
	};

	const playedError = (message: string) => {
		setStatus(message);
	};

	const wins = (winner: string) => {
		setStatus(`Player ${winner} wins`);
	};

	return (
		<>
			<section className={styles.title}>
				<h1>Tic Tac Toe Diogo</h1>
			</section>

			<section className={styles.display} role="textbox">
				Player <span>{nextPLayer}</span>'s turn
			</section>

			<Board
				game={ticTacToeGame}
				playedCallBack={played}
				invalidPlayCallBack={playedError}
				winnerCallBack={wins}
			/>

			<section>
				<h3 className={styles.display} role="status">
					{status}
				</h3>
			</section>
		</>
	);
}
