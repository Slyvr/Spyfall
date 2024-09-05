require("dotenv").config({path: __dirname + "/.env" });
const express = require('express');
const pool = require(__dirname + "/config/db.config.js");
const app = express();
const PORT = process.env.PORT || 9000;
const cors = require('cors');

app.use(cors());
app.use(express.json());

const getLocations = (req,res) => {
	pool.query('select l.location_id, l.name location_name, c.name category_name from location l inner join category c on c.category_id = l.category_id where c.category_id in (2,3)', (error, locations) => {
		if (error){
			throw error
		}
		
		res.status(200).json(locations.rows)
	})
};

const getPlayers = async (req, res) => {
	try{
		const { gameId } = req.params;
		const players = await pool.query('select * from player where game_id = $1',[gameId]);
		res.json(players.rows);
	} catch(err) {
		console.error(err.message);
	}
};

const createPlayer = async (req, res) => {
	newPlayerId = null;
	try{
		const { name, handicap } = req.body;
		const newPlayer = await pool.query('insert into player (name, handicap) values ($1) returning *',[name, handicap]);
		newPlayerId = newPlayer.rows[0].player_id;
		//res.json(newPlayer.rows[0]);
	} catch(err) {
		console.error(err.message);
	}
	/*
	try{
		const { gameId } = req.body;
		const newPlayerJoin = await pool.query('insert into player_join (player_id, game_id) values ($1,$2) returning *',[newPlayerId,gameId]);
		res.json(newPlayerJoin.rows[0]);
	} catch(err) {
		console.error(err.message);
	}*/
};

app.get("/", (req,res) => {
	res.send("Hello World");
});

app.get('/locations', getLocations)

app.post('/players', createPlayer);

app.get('/players/:gameId', getPlayers);

app.listen(PORT, () => {
	console.log(`Server listening on the port ${PORT}`);
});