let chatrooms = [{"chatroom_id":2,"lastupdatetime":["2022-09-22T03:47:24.074Z","2022-09-22T03:25:37.365Z"],"text":["new","I am worker 2"],"sender_id":[6,6],"is_favourite":[true,true]},{"chatroom_id":1,"lastupdatetime":["2022-09-22T03:32:07.304Z","2022-09-22T03:24:01.722Z"],"text":["more message","hello I am worker 1"],"sender_id":[1,5],"is_favourite":[false,false]}]


let i = 0

let newChatrooms: any = []

while (i < chatrooms.length) {
    let chatroom = {lastUpdateTime: "", text: "", sender_id: 0, is_favourite: false}
    chatroom['lastUpdateTime'] = chatrooms[i].lastupdatetime[0]
    chatroom['text'] = chatrooms[i].text[0]
    chatroom['sender_id']  = chatrooms[i].sender_id[0]
    chatroom['is_favourite']  = chatrooms[i].is_favourite[0]
    console.log({chatroom: chatroom})
    newChatrooms.push(chatroom)
    i++
  }

  console.log(newChatrooms)