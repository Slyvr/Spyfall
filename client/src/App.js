import './App.css';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
	const [data, setData] = useState([]);
	
	useEffect(() => {
		axios
			.get('/locations')
			.then(res => res.data)
			.then(data => setData(data));
	}, []);
	
	return (
		<div>
			<div id='playerSet'>
				<form>
					<input type='text' id='playerName' value='Enter Player Name' />
					<input type='checkbox' id='handicap' value='Newbie' />
					<button class='btn btn-primary'>Set Name</button>
				</form>
			</div>
			<div id='joinGame'>
				<form>
					<input type='text' id='gameCode' value='Enter A Game Code' />
					<button class='btn btn-primary'>Join Game</button>
					<button class='btn btn-primary'>Create New Game</button>
				</form>
			</div>
			<div className='container my-5' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
				<table className='table table-striped'>
					<thead>
						<tr>
							<th>Location Name</th>
							<th>Category</th>
						</tr>
					</thead>
					<tbody>
					{ data.map(item => (
						<tr key={item.location_id}>
							<td>{item.location_name}</td>
							<td>{item.category_name}</td>
						</tr>
					))}
					</tbody>
				</table> 
			</div>
		</div>
	)
};

export default App;
