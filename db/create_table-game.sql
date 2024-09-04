create table game
(
    game_id serial not null,
    host_player_id int not null,
    game_code varchar(50) not null default upper(substr(md5(random()::text), 1, 5)),
    spy_count int not null default 1,
    time_limit int not null default 0,
    create_date date default current_timestamp,
    primary key (game_id),
    constraint fk_host_player
		foreign key(host_player_id) 
			references player(player_id)
);