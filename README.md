# Handyman Matching Platform
Welcome to my coding project which aims to help users to find handyman online. Since I mainly focused on the chat functions, you can kindly go to the below files to checkout my work.
frontend
   └─src
        ├─components
        │  ├─ChatInput.tsx
        │  ├─ChatTab.tsx
        │  ├─Chats.tsx
        │  └─MessageBubble.tsx
        ├─pages
        │  ├─ChatList.tsx
        │  └─ChatRoom.tsx
        ├─redux
        │  └─chatroom
        │    ├─action.ts
        │    ├─reducer.ts
        │    └─state.ts
        └─socket
           ├─SocketContext.ts
           └─SocketContextComponent.tsx

![image](https://user-images.githubusercontent.com/99062097/194806324-37a2dd7a-1f6f-45ad-9dc1-20415f7c1ac7.png)
![image](https://user-images.githubusercontent.com/99062097/194806351-fc6604f0-d543-495c-aaa4-e6dc1628ce4c.png)

backend
   └─src
        ├─dto
        │  ├─attendees.dto.ts
        │  ├─chatroom.dto.ts
        │  └─message.dto.ts
        ├─socket-connected-user
        │  └─connected-user.service.ts
        ├─chatroom.controller.ts
        ├─chatroom.module.ts
        ├─chatroom.service.ts
        └─websocketgateway.ts
