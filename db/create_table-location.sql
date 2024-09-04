create table location
(
    location_id serial not null,
    name varchar(50) not null,
    category_id int,
    create_date date default current_timestamp,
    primary key(location_id),
    constraint fk_category
    	foreign key(category_id)
    		references category(category_id)
);