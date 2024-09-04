create table category
(
    category_id serial not null,
    name varchar(50) not null,
    type varchar(50) not null,
    create_date date default current_timestamp,
    primary key (category_id)
);