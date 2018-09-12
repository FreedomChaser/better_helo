select * from heloUsers
where $2 is not null and userid <> $1
order by userid
offset $3
limit 12