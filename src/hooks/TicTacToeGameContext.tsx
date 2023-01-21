import { createContext, useCallback, useMemo, useState } from "react";

import { Game } from "../domain/Game";

export interface props {
	children?: React.ReactNode;
}

export interface TicTacToeGameContextState {
	nextPlayer?: string;
	status?: string;
	game?: Game;
	onPlay?: () => void;
	onError?: (message: string) => void;
	onWin?: (winner: string) => void;
}

export const TicTacToeGameContext = createContext<TicTacToeGameContextState>({});

export function TicTacToeGameContextProvider({ children }: props) {
	const game = useMemo<Game>(() => new Game(), []);
	const [nextPlayer, setNextPlayer] = useState<string>(game.nextPlayer);
	const [status, setStatus] = useState<string>("");

	const onPlay = useCallback(() => {
		setNextPlayer(game.nextPlayer);
		setStatus("");
	}, [game]);

	const onError = useCallback((message: string) => {
		setStatus(message);
	}, []);

	const onWin = useCallback((winner: string) => {
		setStatus(`Player ${winner} wins`);
	}, []);

	return (
		<TicTacToeGameContext.Provider value={{ nextPlayer, status, game, onPlay, onError, onWin }}>
			{children}
		</TicTacToeGameContext.Provider>
	);
}
