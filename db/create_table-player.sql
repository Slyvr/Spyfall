create table player
(
    player_id serial not null,
    name varchar(50) not null,
    handicap boolean,
    create_date date default current_timestamp,
    primary key(player_id)
);