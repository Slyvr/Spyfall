require("dotenv").config({path: __dirname + "/.env" });
const express = require('express');
const pool = require(__dirname + "/config/db.config.js");
const app = express();
const PORT = process.env.PORT || 9000;
const cors = require('cors');

app.use(cors());
app.use(express.json());

const getLocations = async (req,res) => {
	response = {};
	try {
		const locations = await pool.query('select * from location');
		
		response['locations'] = locations.rows;
	} catch(err){
		console.error(err.message);
	}
	
	res.json(response);
};

const getLocationsByLocationId = async (req,res) => {
	response = {};
	try {
		const { locationId } = req.params;
		const locations = await pool.query('select * from location where location_id = $1',[locationId]);
		
		response['location'] = locations.rows[0];
	} catch(err){
		console.error(err.message);
	}
	
	res.json(response);
};

const getPlayersByGameId = async (req, res) => {
	response = {};
	try{
		const { gameId } = req.params;
		const players = await pool.query('select p.* from player p inner join player_join pj on pj.player_id = p.player_id where pj.game_id = $1',[gameId]);
		response['players'] = players.rows;
	} catch(err) {
		console.error(err.message);
	}
	
	res.json(response);
};

const createPlayer = async (req, res) => {
	newPlayerId = null;
	response = {};
	try{
		const { name, handicap } = req.body;
		const newPlayer = await pool.query('insert into player (name, handicap) values ($1,$2) returning *',[name, handicap]);
		response['player'] = newPlayer.rows[0];
	} catch(err) {
		console.error(err.message);
	}
	
	res.json(response);
};

const createGame = async(req,res) => {
	playerId = null;
	response = {};
	try{
		const { hostPlayerId } = req.body;
		const newGame = await pool.query('insert into game (host_player_id, spy_count, time_limit) values ($1,$2,$3) returning *',[hostPlayerId, 1, 0]);
		gameId = newGame.rows[0].game_id;
		playerId = hostPlayerId;
		response['game'] = newGame.rows[0];
	} catch(err) {
		console.error(err.message);
	}
	
	try{
		//Create the join of the player to the game
		const newPlayerJoin = await pool.query('insert into player_join (player_id, game_id) values ($1,$2) returning *',[playerId,gameId]);
		response['player_join'] = newPlayerJoin.rows[0];
	} catch(err) {
		console.error(err.message);
	}
	
	res.json(response);
};

app.get("/", (req,res) => {
	res.send("Hello World");
});

app.get('/locations', getLocations)

app.get('/locations/:locationId', getLocationsByLocationId)

app.post('/players', createPlayer);

app.get('/players/:gameId', getPlayersByGameId);

app.post('/game', createGame);

app.listen(PORT, () => {
	console.log(`Server listening on the port ${PORT}`);
});