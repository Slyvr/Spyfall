select * from category

select * from location

select
	loc.*
from location loc
inner join category cat on cat.category_id = loc.category_id
where cat.name = 'Spyfall 1'