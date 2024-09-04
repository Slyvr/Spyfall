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
	)
};

export default App;
