import { config } from "dotenv";
import express from "express";
import { createServer } from "http";
import socketIO from "socket.io";
import Player from "./models/Player";
import Game from "./models/Game";

config();

const PORT = process.env.PORT;

const app = express();
const server = createServer(app);
const io = socketIO(server);
let players: Player[] = [];
let games: Game[] = [];

app.get("/", (_, res) => {
	res.send("hello fellows");
});

io.on("connection", socket => {
	console.log("new connection");

	let player = new Player(socket);
	players.push(player);
});

server.listen(PORT, () => {
	console.log(`Server ready at http://localhost:${PORT}`);
});

const removeMissingPlayers = () => {
	for (const player of players) {
		if (!player.checkActivity()) {
			const removeIndex = players.indexOf(player);
			players.splice(removeIndex, 1);
			console.log(`Player : "${player.nickname}" | socketID : ${player.socket.id} has been removed`);
		}
	}

	setTimeout(() => {
		removeMissingPlayers();
	}, 5000);
};

const tryCreateGame = () => {
	let gamePlayers: Player[] = [];

	for (const player of players) {
		if (player.canPlay) {
			gamePlayers.push(player);
		}

		if (gamePlayers.length >= 2) {
			games.push(new Game(gamePlayers, io));
			gamePlayers = [];
		}
	}

	setTimeout(() => {
		tryCreateGame();
	}, 3000);
};

removeMissingPlayers();
tryCreateGame();