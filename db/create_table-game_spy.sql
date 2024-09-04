CREATE TABLE game_spy
(
    game_spy_id SERIAL NOT NULL,
    game_id int,
    player_id int,
    create_date date default current_timestamp,
    PRIMARY KEY (game_spy_id),
	CONSTRAINT fk_game
		FOREIGN KEY(game_id) 
			REFERENCES game(game_id),
    CONSTRAINT fk_player
    	FOREIGN KEY(player_id)
    		REFERENCES player(player_id)
);