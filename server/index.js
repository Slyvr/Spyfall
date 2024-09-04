require("dotenv").config({path: __dirname + "/.env" });
const express = require('express');
const pool = require(__dirname + "/config/db.config.js");
const app = express();
const PORT = process.env.PORT || 9000;

const getLocations = (req,res) => {
	pool.query('select l.location_id, l.name location_name, c.name category_name from location l inner join category c on c.category_id = l.category_id where c.category_id in (2,3)', (error, locations) => {
		if (error){
			throw error
		}
		
		res.status(200).json(locations.rows)
	})
};

app.get("/", (req,res) => {
	res.send("Hello World");
});

app.get('/locations', getLocations)

app.listen(PORT, () => {
	console.log(`Server listening on the port ${PORT}`);
});