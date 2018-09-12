update heloUsers
set not_friends = false
where heloUsers.userid in (select friendid from heloFriends where userid = $1)