update heloUsers
set not_friends = true
where heloUsers.userid not in (select friendid from heloFriends where userid = $1)