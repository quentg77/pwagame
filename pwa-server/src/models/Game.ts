import Player from "./Player";
import { v4 as uuidv4 } from "uuid";

export default class Game {

	players: Player[];
	io: SocketIO.Namespace;
	gameID: string;
	number: number;

	constructor(players: Player[], io: SocketIO.Server) {
		console.log("game created");
		this.gameID = uuidv4();
		this.players = players;
		this.io = io.in(this.gameID);
		this.number = Math.round(Math.random() * 1337);

		console.log(this.number);

		for (const player of players) {
			player.setPlaying(true);
			player.socket.join(this.gameID);
		}

		this.initSocket();
		console.log("game started");
		this.io.server.emit("event::gameStarted");
	}

	private initSocket() {
		for (const player of this.players) {
			player.socket.on("event::testNumber", number => {
				console.log("testNumber");
				let intNumber = parseInt(number, 10);

				switch (true) {
					case intNumber > this.number:
						player.socket.emit("event::tooHight");
						break;
					case intNumber < this.number:
						player.socket.emit("event::tooLow");
						break;
					case intNumber === this.number:
						player.socket.emit("event::winner");
						player.socket.broadcast.to(this.gameID).emit("event::okboomer");
						break;
					default:
						break;
				}
			});
		}
	}
}