import { createContext, useState } from "react";

import { Coordinate, Player } from "../domain/Game";

export interface props {
	children?: React.ReactNode;
}

export interface TicTacToePlayContextState {
	player?: Player;
	coordinate?: Coordinate;
	setPlayer?: React.Dispatch<React.SetStateAction<Player | undefined>>;
	setCoordinate?: React.Dispatch<React.SetStateAction<Coordinate | undefined>>;
}

export const TicTacToePlayContext = createContext<TicTacToePlayContextState>({});

export function TicTacToePlayContextProvider({ children }: props) {
	const [player, setPlayer] = useState<Player | undefined>();
	const [coordinate, setCoordinate] = useState<Coordinate | undefined>();

	return (
		<TicTacToePlayContext.Provider value={{ player, coordinate, setPlayer, setCoordinate }}>
			{children}
		</TicTacToePlayContext.Provider>
	);
}
