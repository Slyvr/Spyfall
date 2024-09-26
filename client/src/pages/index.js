import React from "react";
import { Fragment, useState } from 'react';
import ReactDom from 'react-dom/client';

const Home = () => {

	const [playerName, setPlayerName] = useState('');
	const [handicap, setHandicap] = useState(false);
  
	const handleSubmitPlayer = async (event) => {
		event.preventDefault();
		
		try{
			const body = { playerName, handicap };
			const response = await fetch("http://localhost:9000/api/v1/players", {
				method:"POST",
				headers: {"Content-Type": "application/json" },
				body: JSON.stringify(body)
			});
			
			sessionStorage.setItem('playerName',playerName);
			
			console.log(response);
			this.render();
		}catch(err){
			console.log(err.message);
		}
	}

	return (
		<Fragment>
		<div class='container-fluid'>
			<div class="container mt-5">
				<h2 class="text-center mb-4">Player Setup</h2>
				<form class="mb-4" onSubmit={handleSubmitPlayer}>
					<div class="form-group">
						<label for="playerName">Player Name</label>
						<input type="text" name="playerName" class="form-control" id="playerName" placeholder="Enter your name" onChange={e => setPlayerName(e.target.value)} value={playerName}/>
					</div>
					<div class="form-check mb-3">
						<input type="checkbox" name="handicap" class="form-check-input" id="handicap" onChange={e => setHandicap(e.target.checked)} checked={handicap}/>
						<label class="form-check-label" for="handicap">Handicap</label>
					</div>
					<button type="submit" class="btn btn-primary">Set Name & Continue</button>
				</form>


				<h2 class="text-center mb-4">Join a Game</h2>
				<form class="mb-4">
					<div class="form-group">
						<label for="gameCode">Game Code</label>
						<input type="text" class="form-control" id="gameCode" placeholder="Enter game code" />
					</div>
					<button type="button" class="btn btn-success">Join Game</button>
				</form>


				<button type="button" class="btn btn-warning">Create New Game</button>
			</div>
		</div>
		</Fragment>
	);
};



export default Home;
