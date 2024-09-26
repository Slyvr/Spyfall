import React from "react";

const Header = () => {
	
	const playerName = sessionStorage.getItem('playerName');
	
	return (
		<div>
			<h1>Spyfall</h1>
			<div>Player Name: {playerName}</div>
		</div>
	);
};

export default Header;