import React, { useState } from "react";

interface Props {
	io: SocketIOClient.Socket;
}
const AskNickname = (props: Props) => {
	const { io } = props;
	const [nickname, setNickname] = useState("");

	const handleNickname = (event: React.ChangeEvent<HTMLInputElement>) => {
		setNickname(event.target.value);
	};

	const sendNickname = () => {
		io.emit("event::initialize", { nickname });
	};

	return (
		<div className="field">
			<div className="control">
				<input className="input" onChange={handleNickname} value={nickname} />
			</div>
			<div className="control">
				<a className="button is-info" onClick={sendNickname}>Send</a>
			</div>
		</div>
	);
};

export default AskNickname;
