create table player
(
    player_id serial not null,
    name varchar(50) not null,
    handicap boolean,
    primary key(player_id)
);