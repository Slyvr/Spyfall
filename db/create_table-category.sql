create table category
(
    category_id serial not null,
    name varchar(50) not null,
    type varchar(50) not null,
    primary key (category_id)
);