import { useContext, useEffect } from "react";

import { Player } from "../../domain/Game";
import { TicTacToeGameContext } from "../../hooks/TicTacToeGameContext";
import { TicTacToePlayContext } from "../../hooks/TicTacToePlayContextProvider";
import styles from "./Board.module.scss";
import { Tile } from "./tile/Tile";

export function Board() {
	const { coordinate, setPlayer } = useContext(TicTacToePlayContext);
	const { game, onPlay, onWin, onError } = useContext(TicTacToeGameContext);

	useEffect(() => {
		if (coordinate && setPlayer && game && onPlay && onWin && onError) {
			try {
				const player = game.play(coordinate.x, coordinate.y);
				setPlayer(player as Player);
				onPlay();

				const winner = game.winner();
				if (winner !== "") {
					onWin(winner);
				}
			} catch (error) {
				onError((error as Error).message);
			}
		}
	}, [coordinate, game, onError, onPlay, setPlayer, onWin]);

	return (
		<>
			<section className={styles.container}>
				<div role="row" className={styles.row}>
					<Tile x={0} y={0} />
					<Tile x={1} y={0} />
					<Tile x={2} y={0} />
				</div>
				<div role="row" className={styles.row}>
					<Tile x={0} y={1} />
					<Tile x={1} y={1} />
					<Tile x={2} y={1} />
				</div>
				<div role="row" className={styles.row}>
					<Tile x={0} y={2} />
					<Tile x={1} y={2} />
					<Tile x={2} y={2} />
				</div>
			</section>
		</>
	);
}
