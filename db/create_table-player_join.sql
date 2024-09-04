create table player_join
(
    player_join_id serial not null,
    game_id int,
    player_id int,
    primary key (player_join_id),
	constraint fk_game
		foreign key(game_id) 
			references game(game_id),
    constraint fk_player
    	foreign key(player_id)
    		references player(player_id)
);