import { Game } from "../../domain/Game";
import styles from "./Board.module.scss";
import { ClickEvent, Tile } from "./tile/Tile";

export interface BoardProps {
	game: Game;
	playedCallBack: () => void;
	invalidPlayCallBack: (message: string) => void;
	winnerCallBack: (winner: string) => void;
}

const Board: React.FC<BoardProps> = ({
	game,
	playedCallBack,
	invalidPlayCallBack: errorCallBack,
	winnerCallBack,
}: BoardProps) => {
	const playedCallBackHandler = (clickEvent: ClickEvent) => {
		try {
			const player = game.play(clickEvent.coordinate.x, clickEvent.coordinate.y);
			clickEvent.updatePlayerOnTileCallBack(player);

			playedCallBack();

			const winner = game.winner();
			if (winner !== "") {
				winnerCallBack(winner);
			}
		} catch (error) {
			errorCallBack((error as Error).message);
		}
	};

	return (
		<>
			<section className={styles.container}>
				<div role="row" className={styles.row}>
					<Tile x={0} y={0} onTileClickedCallBack={playedCallBackHandler} />
					<Tile x={0} y={1} onTileClickedCallBack={playedCallBackHandler} />
					<Tile x={0} y={2} onTileClickedCallBack={playedCallBackHandler} />
				</div>
				<div role="row" className={styles.row}>
					<Tile x={1} y={0} onTileClickedCallBack={playedCallBackHandler} />
					<Tile x={1} y={1} onTileClickedCallBack={playedCallBackHandler} />
					<Tile x={1} y={2} onTileClickedCallBack={playedCallBackHandler} />
				</div>

				<div role="row" className={styles.row}>
					<Tile x={2} y={0} onTileClickedCallBack={playedCallBackHandler} />
					<Tile x={2} y={1} onTileClickedCallBack={playedCallBackHandler} />
					<Tile x={2} y={2} onTileClickedCallBack={playedCallBackHandler} />
				</div>
			</section>
		</>
	);
};

export { Board };
