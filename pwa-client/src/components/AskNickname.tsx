import React, { useState } from "react";

interface Props {
	io: SocketIOClient.Socket;
	nickname: string;
	setNickname: React.Dispatch<React.SetStateAction<string>>;
}

let eventLoaded = false;

const AskNickname = (props: Props) => {
	const { io, nickname, setNickname } = props;
	const [nameOK, setNameOK] = useState(true);

	if (!eventLoaded) {
		io.on("event::nickname_KO", () => {
			console.log("nickname_KO");
			setNameOK(false);
		});

		eventLoaded = true;
	}

		const handleNickname = (event: React.ChangeEvent<HTMLInputElement>) => {
			setNickname(event.target.value);
			setNameOK(true);
		};

		const sendNickname = () => {
			console.log("send name");
			io.emit("event::setname", { nickname });
		};

	return (
		<div className="field">
			<div className="control">
				<input className="input" onChange={handleNickname} value={nickname} />
			</div>
			{
				!nameOK &&
				<div className="bad-nickname">
					<p>bad nickname</p>
				</div>
			}
			<div className="control">
				<a className="button is-info" onClick={sendNickname}>Send</a>
			</div>
		</div>
	);
};

export default AskNickname;
