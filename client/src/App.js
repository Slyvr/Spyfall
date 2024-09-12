import './App.css';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
	const [locations, setLocations] = useState([]);
	
	useEffect(() => {
		axios
			.get('/locations')
			.then(res => res.data)
			.then(data => setLocations(data.locations));
	}, []);
	
	return (
		<div class='container-fluid'>
			<div class="container mt-5">
				<h2 class="mb-4">Player Setup</h2>
				<form class="mb-4">
					<div class="form-group">
						<label for="playerName">Player Name</label>
						<input type="text" class="form-control" id="playerName" placeholder="Enter your name" />
					</div>
					<div class="form-check mb-3">
						<input type="checkbox" class="form-check-input" id="handicap" />
						<label class="form-check-label" for="handicap">Handicap</label>
					</div>
					<button type="button" class="btn btn-primary">Set Name</button>
				</form>


				<h2 class="mb-4">Join a Game</h2>
				<form class="mb-4">
					<div class="form-group">
						<label for="gameCode">Game Code</label>
						<input type="text" class="form-control" id="gameCode" placeholder="Enter game code" />
					</div>
					<button type="button" class="btn btn-success">Join Game</button>
				</form>


				<button type="button" class="btn btn-warning">Create New Game</button>
			</div>
			{/*
			<div className='container my-5' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
				<table className='table table-striped'>
					<thead>
						<tr>
							<th>Location Name</th>
							<th>Category</th>
						</tr>
					</thead>
					<tbody>
					{ locations.map(item => (
						<tr key={item.location_id}>
							<td>{item.name}</td>
							<td>{item.category_id}</td>
						</tr>
					))}
					</tbody>
				</table> 
			</div>
			*/}
		</div>
	)
};

export default App;
