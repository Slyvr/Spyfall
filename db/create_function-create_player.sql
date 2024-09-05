create function create_player(
	p_name varchar(50),
	p_handicap bool,
	p_gameid int)
returns int
language plpgsql
as
$$
declare
	v_newplayerid int;
begin
	insert into player (name, handicap) values (p_name, p_handicap);
	select currval(pg_get_serial_sequence('player','player_id')) into v_newplayerid;

	insert into player_join (player_id, game_id) values (v_newplayerid, p_gameid);

	return v_newplayerid;
end;
$$;