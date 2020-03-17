import React, { useState } from "react";
import useInput from "../hooks/userInput";

interface Props {
	io: SocketIOClient.Socket;
	nickname: string;
	gameStarted: boolean;
}

let eventLoaded = false;

const MagicNumber = (props: Props) => {
	const { io, nickname, gameStarted } = props;

	const number = useInput("");
	const [resultMessage, setResultMessage] = useState("");
	const [displayInput, setDisplayInput] = useState(true);

	if (!eventLoaded) {
		io.on("event::tooHight", () => {
			setResultMessage("Too hight");
		});

		io.on("event::tooLow", () => {
			setResultMessage("Too Low");
		});

		io.on("event::winner", () => {
			setResultMessage("WINNER");
			setDisplayInput(false);
		});

		io.on("event::okboomer", () => {
			setResultMessage("OK BOOMER");
			setDisplayInput(false);
		});
		eventLoaded = true;
	}

	const sendNumber = () => {
		io.emit("event::testNumber", number.value);
	};

	return (
		<div className="game">
			<h1>Hello {nickname}</h1>
			{
				!gameStarted &&
				<h1>Waiting for players</h1>
			}
			{
				gameStarted &&
				<>
					{resultMessage}
					{
						displayInput &&
						<>
							<input className="input" type="number" {...number} />
							<a className="button is-info" onClick={sendNumber}>Send</a>
						</>
					}
				</>
			}
		</div>
	);
};

export default MagicNumber;
