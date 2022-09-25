let chatrooms: Chatroom[] = [{"chatroom_id":17,"lastUpdateTime":["2022-09-25T16:19:44.396Z"],"text":["4"],"sender_id":[5],"is_favourite":false,"attendees":[{"user_id":1,"nickname":"admin1"},{"user_id":5,"nickname":"worker1"}]},{"chatroom_id":20,"lastUpdateTime":["2022-09-25T16:19:48.381Z"],"text":["3"],"sender_id":[5],"is_favourite":false,"attendees":[{"user_id":5,"nickname":"worker1"},{"user_id":13,"nickname":"未註冊用戶13"}]},{"chatroom_id":21,"lastUpdateTime":["2022-09-23T08:23:37.520Z"],"text":["yo"],"sender_id":[5],"is_favourite":true,"attendees":[{"user_id":5,"nickname":"worker1"},{"user_id":13,"nickname":"未註冊用戶13"}]},{"chatroom_id":22,"lastUpdateTime":["2022-09-23T08:23:44.930Z"],"text":["🤑"],"sender_id":[5],"is_favourite":true,"attendees":[{"user_id":5,"nickname":"worker1"},{"user_id":13,"nickname":"未註冊用戶13"}]},{"chatroom_id":23,"lastUpdateTime":["2022-09-23T08:24:02.529Z"],"text":["123213"],"sender_id":[5],"is_favourite":true,"attendees":[{"user_id":5,"nickname":"worker1"},{"user_id":13,"nickname":"未註冊用戶13"}]},{"chatroom_id":24,"lastUpdateTime":["2022-09-23T08:24:12.147Z"],"text":["3213123"],"sender_id":[5],"is_favourite":true,"attendees":[{"user_id":5,"nickname":"worker1"},{"user_id":13,"nickname":"未註冊用戶13"}]},{"chatroom_id":25,"lastUpdateTime":["2022-09-23T08:24:24.487Z"],"text":["123213"],"sender_id":[5],"is_favourite":true,"attendees":[{"user_id":5,"nickname":"worker1"},{"user_id":13,"nickname":"未註冊用戶13"}]},{"chatroom_id":26,"lastUpdateTime":["2022-09-23T08:24:36.114Z"],"text":["312321"],"sender_id":[5],"is_favourite":true,"attendees":[{"user_id":5,"nickname":"worker1"},{"user_id":13,"nickname":"未註冊用戶13"}]},{"chatroom_id":28,"lastUpdateTime":["2022-09-23T08:25:20.360Z"],"text":["why no msg?"],"sender_id":[5],"is_favourite":true,"attendees":[{"user_id":5,"nickname":"worker1"},{"user_id":13,"nickname":"未註冊用戶13"}]},{"chatroom_id":29,"lastUpdateTime":["2022-09-23T08:25:37.974Z"],"text":["no msg again?"],"sender_id":[5],"is_favourite":true,"attendees":[{"user_id":13,"nickname":"未註冊用戶13"},{"user_id":5,"nickname":"worker1"}]},{"chatroom_id":30,"lastUpdateTime":["2022-09-25T16:19:52.117Z"],"text":["2"],"sender_id":[5],"is_favourite":false,"attendees":[{"user_id":13,"nickname":"未註冊用戶13"},{"user_id":5,"nickname":"worker1"}]},{"chatroom_id":31,"lastUpdateTime":["2022-09-25T16:19:57.414Z"],"text":["1"],"sender_id":[5],"is_favourite":false,"attendees":[{"user_id":5,"nickname":"worker1"},{"user_id":13,"nickname":"未註冊用戶13"}]}]


// let i = 0

// let newChatrooms: any = []

// while (i < chatrooms.length) {
//     let chatroom = {lastUpdateTime: "", text: "", sender_id: 0, is_favourite: false}
//     chatroom['lastUpdateTime'] = chatrooms[i].lastupdatetime[0]
//     chatroom['text'] = chatrooms[i].text[0]
//     chatroom['sender_id']  = chatrooms[i].sender_id[0]
//     chatroom['is_favourite']  = chatrooms[i].is_favourite[0]
//     console.log({chatroom: chatroom})
//     newChatrooms.push(chatroom)
//     i++
//   }

type Chatroom = {
  chatroom_id: number,
  lastUpdateTime: string[]|any,
  text: string[],
  sender_id: number[],
  is_favourite: boolean,
  attendees: {
      user_id: number,
      nickname: string,
  }[];
}

chatrooms.sort(function(x, y){
  return x.lastUpdateTime[0] - y.lastUpdateTime[0];
})

console.log(chatrooms)

console.log(2022-09-23, T08:24:12.147Z - 2022-09-25T16:19:48.381Z)