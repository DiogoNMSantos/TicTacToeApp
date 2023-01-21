import { useContext } from "react";

import styles from "./App.module.scss";
import { TicTacToeGameContext } from "./hooks/TicTacToeGameContext";
import { TicTacToePlayContextProvider } from "./hooks/TicTacToePlayContextProvider";
import { Board } from "./sections/board/Board";

export function App() {
	const { status, nextPlayer } = useContext(TicTacToeGameContext);

	return (
		<>
			<section className={styles.title}>
				<h1>Tic Tac Toe Diogo</h1>
			</section>

			<section className={styles.display} role="textbox">
				Player <span>{nextPlayer}</span>'s turn
			</section>

			<TicTacToePlayContextProvider>
				<Board />
			</TicTacToePlayContextProvider>
			<section>
				<h3 className={styles.display} role="status">
					{status}
				</h3>
			</section>
		</>
	);
}
