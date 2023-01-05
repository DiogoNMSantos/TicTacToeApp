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
	invalidPlayCallBack,
	winnerCallBack,
}: BoardProps) => {
	const playedCallBackHandle = (clickEvent: ClickEvent) => {
		try {
			const player = game.play(clickEvent.coordinate.x, clickEvent.coordinate.y);
			clickEvent.updatePlayerOnTileCallBack(player);
			playedCallBack();
			winnerCallBack(player);
		} catch (error) {
			invalidPlayCallBack((error as Error).message);
		}
	};

	return (
		<>
			<section className={styles.container}>
				<div role="row" className={styles.row}>
					<Tile x={0} y={0} onTileClickedCallBack={playedCallBackHandle} />
					<Tile x={0} y={1} onTileClickedCallBack={playedCallBackHandle} />
					<Tile x={0} y={2} onTileClickedCallBack={playedCallBackHandle} />
				</div>
				<div role="row" className={styles.row}>
					<Tile x={1} y={0} onTileClickedCallBack={playedCallBackHandle} />
					<Tile x={1} y={1} onTileClickedCallBack={playedCallBackHandle} />
					<Tile x={1} y={2} onTileClickedCallBack={playedCallBackHandle} />
				</div>

				<div role="row" className={styles.row}>
					<Tile x={2} y={0} onTileClickedCallBack={playedCallBackHandle} />
					<Tile x={2} y={1} onTileClickedCallBack={playedCallBackHandle} />
					<Tile x={2} y={2} onTileClickedCallBack={playedCallBackHandle} />
				</div>
			</section>
		</>
	);
};

export { Board };
