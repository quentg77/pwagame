interface ISetname {
	nickname: string;
}

export default class Player {
	nickname: string;
	socket: SocketIO.Socket;
	isActive: boolean;
	canPlay: boolean;
	isPlaying: boolean;
	score: number;

	constructor(socket: SocketIO.Socket) {
		this.socket = socket;
		this.nickname = "";
		this.isActive = true;
		this.canPlay = false;
		this.isPlaying = false;
		this.score = 0;

		this.initSocket();
		console.log("playerInited");
		this.socket.emit("event::handshake");
	}

	private initSocket() {
		console.log("socket opened");
		this.socket.on("event::setname", (payload: ISetname) => {
			if (payload.nickname.trim()) {
				this.nickname = payload.nickname.trim();
				console.log("new name received:", this.nickname);
				this.socket.emit("event::nickname_OK");
			} else {
				console.log("bad nickname");
				this.socket.emit("event::nickname_KO");
			}
		});

		this.socket.on("event::ping", () => {
			this.isActive = true;
		});

		this.socket.on("event::ready", () => {
			if (!this.isPlaying) {
				console.log(this.nickname, "is ready");
				this.canPlay = true;
			}
		});
	}

	public checkActivity(): boolean {
		if (this.isActive) {
			this.isActive = false;
			this.socket.emit("event::ping");
			return true;
		} else {
			return false;
		}
	}

	public setPlaying(playing: boolean) {
		this.canPlay = !playing;
		this.isPlaying = playing;
	}

	public addScore(score: number) {
		this.score += score;
	}

	public resetScore() {
		this.score = 0;
	}
}