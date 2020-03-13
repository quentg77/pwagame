import React, { useState } from "react";
import { EScreen } from "./../enum/EScreen";

interface Props {
	nickname: string;
	setSelectedScreen: React.Dispatch<React.SetStateAction<EScreen>>;
}

const Menu = (props: Props) => {
	const { nickname, setSelectedScreen } = props;

	return (
		<div className="menu">
			<h1>Hello {nickname}</h1>
			<a className="button is-info" onClick={() => setSelectedScreen(EScreen.magicNumber)}>MagicNumber</a>
			<a className="button is-info" onClick={() => null}>WIP</a>
			<a className="button is-info" onClick={() => null}>WIP</a>
		</div>
	);
};

export default Menu;