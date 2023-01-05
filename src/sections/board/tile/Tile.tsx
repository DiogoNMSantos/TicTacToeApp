import React, { useState } from "react";

import styles from "./Tile.module.scss";

export interface Coordinate {
	x: number;
	y: number;
}

export interface ClickEvent {
	coordinate: Coordinate;
	updatePlayerOnTileCallBack: (playerToken: string) => void;
}

export interface TileProperties {
	x: number;
	y: number;
	onTileClickedCallBack: (clickEvent: ClickEvent) => void;
}

export function Tile({ x, y, onTileClickedCallBack: onClick }: TileProperties) {
	const [tileProperties, _] = useState<TileProperties>({ x, y, onTileClickedCallBack: onClick });
	const [player, setPlayer] = useState<string>("");

	const displayPlayer = (player: string) => {
		setPlayer(player);
	};

	const handleClick = (_: React.MouseEvent) => {
		tileProperties.onTileClickedCallBack({
			coordinate: { x: tileProperties.x, y: tileProperties.y },
			updatePlayerOnTileCallBack: displayPlayer,
		});
	};

	return (
		<div className={styles.tile} role="cell" onClick={handleClick}>
			{player}
		</div>
	);
}
