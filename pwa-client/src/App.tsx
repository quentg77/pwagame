import React, { useState, useEffect } from "react";
import socketIO from "socket.io-client";
import AskNickname from "./components/AskNickname";
import MagicNumber from "./components/MagicNumber";
import Menu from "./components/Menu";
import { EScreen } from "./enum/EScreen";

console.log(window.location.hostname);

const io = socketIO(`http://${window.location.hostname}:3000`);
let eventLoaded = false;

const App = () => {
	const [selectedScreen, setSelectedScreen] = useState(EScreen.selectName);
	const [nickname, setNickname] = useState("");
	const [gameStarted, setGameStarted] = useState(false);

	if (!eventLoaded) {
		io.on("event::ping", () => {
			io.emit("event::ping");
		});

		io.on("event::handshake", () => {
			console.log("handshake");
		});

		io.on("event::nickname_OK", () => {
			setSelectedScreen(EScreen.menu);
		});

		io.on("event::gameStarted", () => {
			console.log("event::gameStarted");
			setGameStarted(true);
		});

		eventLoaded = true;
	}

	const screenSwitch = (screen: EScreen) => {
		switch (screen) {
			case EScreen.selectName:
				return (
					<AskNickname
						io={io}
						nickname={nickname}
						setNickname={setNickname}
					/>
				);
			case EScreen.menu:
				return (
					<Menu
						nickname={nickname}
						setSelectedScreen={setSelectedScreen}
					/>
				);
			case EScreen.magicNumber:
				io.emit("event::ready");

				return (
					<MagicNumber
						io={io}
						nickname={nickname}
						gameStarted={gameStarted}
					/>
				);
			default:
				break;
		}
	};

	return (
		<section className="hero is-fullheight is-light">
			<div className="hero-head">
				<div className="container">
					<div className="tabs is-centered">
						<ul>
							<li>
								<a>PWA Games</a>
							</li>
						</ul>
					</div>
				</div>
			</div>

			<div className="hero-body">
				<div className="container">
					<header className="bd-index-header">
						{screenSwitch(selectedScreen)}
					</header>
				</div>
			</div>

			<div className="hero-foot">
				<div className="container">
					<div className="tabs is-centered">
						<ul>
							<li>
								<a>Let's Rock!</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</section>
	);
};

export default App;
