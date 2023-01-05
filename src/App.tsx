import { useState } from "react";

import styles from "./App.module.scss";
import { Game } from "./domain/Game";
import { Board } from "./sections/board/Board";

export function App() {
	const [ticTacToeGame, _] = useState<Game>(new Game());
	const [nextPlayer, setNextPlayer] = useState<string>(ticTacToeGame.nextPlayer);

	const played = () => {
		setNextPlayer(ticTacToeGame.nextPlayer);
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
			<Board game={ticTacToeGame} playedCallBack={played} />;
		</>
	);
}
