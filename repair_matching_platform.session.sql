-- Get all the chatroom where a target user embeded in

SELECT chatroom_id FROM attendees
LEFT OUTER JOIN chatrooms
ON chatrooms.id = attendees.chatroom_id 
WHERE user_id = 3 ;

-- Get all the msg record the target user has sent

SELECT * FROM attendees
LEFT OUTER JOIN chatroom_records 
ON chatroom_records.chatroom_id = attendees.chatroom_id 
WHERE user_id = 3 ;

-- Get all the chatroom and their latest records of a target user

SELECT chatrooms.id as chatroom_id, array_agg(text) as text, array_agg(sender_id) as sender_id FROM attendees
INNER JOIN chatrooms ON chatrooms.id = attendees.chatroom_id 
INNER JOIN 
(SELECT text, sender_id, chatroom_id FROM chatroom_records ORDER BY created_at DESC LIMIT 1) as chatroom_records
ON chatroom_records.chatroom_id = attendees.chatroom_id 
WHERE user_id = 3 GROUP BY chatrooms.id;

-- Get all the chatroom and their latest records of a target user (new version)

SELECT chatrooms.id as chatroomId, chatroom_records.created_at as lastUpdateTime, text, sender_id FROM attendees
LEFT JOIN chatrooms ON chatrooms.id = attendees.chatroom_id 
LEFT JOIN (SELECT text, sender_id, chatroom_id, created_at FROM chatroom_records ORDER BY created_at DESC LIMIT 1) as chatroom_records
ON chatroom_records.chatroom_id = chatrooms.id
WHERE attendees.user_id = 2;

select * from chatroom_records;

-- Search user with nickname

select id, email, nickname, phone, gender_id, profile_photo, is_worker, worker_info_id, score from users where nickname Like '%未%';


-- Get all the users from the same chatroom

SELECT user_id from attendees where chatroom_id = 1;

-- check whether workers has taken the order

SELECT * FROM workers_of_order WHERE worker_id = 1 AND order_id = 2;