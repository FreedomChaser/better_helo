create table heloFriends (tableid serial primary key, userid serial references heloUsers(userid), friendid int, isfriend boolean)
