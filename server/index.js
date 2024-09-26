require("dotenv").config({path: __dirname + "/.env" });
const express = require('express');
const db = require(__dirname + "/config/db.config.js");
const app = express();
const PORT = process.env.PORT || 9000;
const cors = require('cors');
const morgan = require('morgan');

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//define middleware to start
app.use((req,res, next) => {
	//Do something here before every/any request
	
	//continue on to whatever routing it should do
	next();
});

const getLocations = async (req,res) => {
	response = {};
	try {
		const locations = await db.query('select * from location');
		
		response['locations'] = locations.rows;
	} catch(err){
		console.error(err.message);
	}
	
	res.json(response);
};

const getLocationsByLocationId = async (req,res) => {
	response = {};
	try {
		const locationId = req.params.locationId;
		const locations = await db.query('select * from location where location_id = $1',[locationId]);
		
		response['location'] = locations.rows[0];
	} catch(err){
		console.error(err.message);
	}
	
	res.json(response);
};

const getPlayersByGameId = async (req, res) => {
	response = {};
	try{
		const gameId = req.params.gameId;
		const players = await db.query('select p.* from player p inner join player_join pj on pj.player_id = p.player_id where pj.game_id = $1',[gameId]);
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
		const { playerName, handicap } = req.body;
		const newPlayer = await db.query('insert into player (name, handicap) values ($1,$2) returning *',[playerName, handicap]);
		response['player'] = newPlayer.rows[0];
	} catch(err) {
		console.error(err.message);
	}
	
	res.json(response);
};

const createGame = async(req,res) => {
	playerId = null;
	gameId = null;
	response = {};
	try{
		const { hostPlayerId } = req.body;
		const newGame = await db.query('insert into game (host_player_id, spy_count, time_limit) values ($1,$2,$3) returning *',[hostPlayerId, 1, 0]);
		gameId = newGame.rows[0]['game_id'];
		playerId = hostPlayerId;
		response['game'] = newGame.rows[0];
	} catch(err) {
		console.error(err.message);
	}
	
	//Create the join of the host player to the game
	try{
		const newPlayerJoin = await db.query('insert into player_join (game_id, player_id) values ($1,$2) returning *',[gameId,playerId]);
		response['player_join'] = newPlayerJoin.rows[0];
	} catch(err) {
		console.error(err.message);
	}
	
	//Setup default locations list
	try {
		const locations = await db.query('select * from location where category_id = 2');
		allLocations = locations.rows;
		newLocationJoin = [];
		
		for (var i=0; i<allLocations.length; i++){
			var location = allLocations[i];
			newLocation = await db.query('insert into location_join (game_id, location_id) values ($1,$2) returning *',[gameId,location['location_id']]);
			newLocationJoin.push(newLocation.rows[0]);
		}
		response['location_join'] = newLocationJoin;
	} catch(err){
		console.error(err.message);
	}
	
	res.json(response);
};

const joinGame = async(req,res) => {
	response = {};
	
	//Try to find the gameId by gameCode
	gameId = null;
	try {
		const { gameCode } = req.body;
		const game = await db.query('select * from game where game_code = $1',[gameCode]);
		gameFound = game.rows[0];
		gameId = gameFound['game_id'];
	} catch(err){
		console.error(err.message);
	}
	
	if (gameId != null){
		//Create the join of the player to the game
		try{
			const { playerId } = req.body;
			const newPlayerJoin = await db.query('insert into player_join (game_id, player_id) values ($1,$2) returning *',[gameId,playerId]);
			response['player_join'] = newPlayerJoin.rows[0];
		} catch(err) {
			console.error(err.message);
		}
	}
	else{
		response['error'] = 'No game was found with that game code';
	}
	
	res.json(response);
};

app.get("/", (req,res) => {
	res.send("Hello World");
});

app.get('/api/v1/locations', getLocations);

app.get('/api/v1/locations/:locationId', getLocationsByLocationId);

app.post('/api/v1/players', createPlayer);

app.get('/api/v1/players/:gameId', getPlayersByGameId);

app.post('/api/v1/game', createGame);

app.post('/api/v1/joinGame', joinGame);

app.listen(PORT, () => {
	console.log(`Server listening on the port ${PORT}`);
});