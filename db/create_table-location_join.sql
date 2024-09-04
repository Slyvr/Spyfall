create table location_join
(
    location_join_id serial not null,
    game_id int,
    location_id int,
    create_date date default current_timestamp,
    primary key (location_join_id),
	constraint fk_game
		foreign key(game_id) 
			references game(game_id),
	constraint fk_location
		foreign key(location_id) 
			references location(location_id)
);