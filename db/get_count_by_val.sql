select count(*) from heloUsers
where $2 is not null and userid <> $1