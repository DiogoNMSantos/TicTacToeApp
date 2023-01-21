import { useContext, useEffect, useState } from "react";

import { CoordinateNumber } from "../../../domain/Game";
import { TicTacToePlayContext } from "../../../hooks/TicTacToePlayContextProvider";
import styles from "./Tile.module.scss";

export interface TileProperties {
	x: CoordinateNumber;
	y: CoordinateNumber;
}

export function Tile({ x, y }: TileProperties) {
	const [played, setPlayed] = useState("");
	const { player, coordinate, setCoordinate } = useContext(TicTacToePlayContext);

	const handleClick = () => {
		if (setCoordinate) {
			setCoordinate({ x, y });
		}
	};

	useEffect(() => {
		if (player && coordinate && coordinate.x === x && coordinate.y === y) {
			setPlayed(player);
		}
	}, [coordinate, player, x, y]);

	return (
		<div className={styles.tile} role="cell" onClick={handleClick}>
			{played}
		</div>
	);
}
