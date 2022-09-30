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

SELECT chatrooms.id as chatroom_id, array_agg(chatroom_records.created_at ORDER BY chatroom_records.created_at DESC) as lastUpdateTime, array_agg(text ORDER BY chatroom_records.created_at DESC) as text, array_agg(sender_id ORDER BY chatroom_records.created_at DESC) as sender_id, array_agg(is_favourite ORDER BY chatroom_records.created_at DESC) as is_favourite FROM attendees
    LEFT JOIN chatrooms ON chatrooms.id = attendees.chatroom_id 
    LEFT JOIN chatroom_records ON chatroom_records.chatroom_id = chatrooms.id 
    WHERE user_id = 5 GROUP BY chatrooms.id ORDER BY lastUpdateTime DESC

-- Search user with nickname

select id, email, nickname, phone, gender_id, profile_photo, is_worker, worker_info_id, score from users where nickname Like '%未%';


-- Get all the users and nickname from the same chatroom

SELECT attendees.user_id, users.nickname FROM attendees INNER JOIN users ON users.id = attendees.user_id WHERE chatroom_id = 1;

-- check whether workers has taken the order

SELECT * FROM workers_of_order WHERE worker_id = 2 AND order_id = 1;

-- Insert into workers_of_order table

INSERT INTO workers_of_order (user_id, worker_id, order_id, chatroom_id) VALUES (1, 2, 1, 1);


-- Get one chatroom only with chatroom_id and user_id

SELECT chatrooms.id as chatroom_id, chatroom_records.created_at as lastUpdateTime, text, sender_id, is_favourite FROM attendees
LEFT JOIN chatrooms ON chatrooms.id = attendees.chatroom_id 
LEFT JOIN (SELECT text, sender_id, chatroom_id, created_at FROM chatroom_records ORDER BY created_at DESC LIMIT 1) as chatroom_records
ON chatroom_records.chatroom_id = chatrooms.id
WHERE (chatrooms.id = 3 AND attendees.user_id = 5);

-- Toggle the boolean status of attendees is_favourite

UPDATE attendees SET is_favourite = NOT is_favourite WHERE (chatroom_id = 1 AND user_id = 1);
