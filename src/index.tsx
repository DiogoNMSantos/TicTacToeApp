import React from "react";
import ReactDOM from "react-dom/client";

import { App } from "./App";
import { TicTacToeGameContextProvider } from "./hooks/TicTacToeGameContext";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<React.StrictMode>
		<TicTacToeGameContextProvider>
			<App />
		</TicTacToeGameContextProvider>
	</React.StrictMode>
);
