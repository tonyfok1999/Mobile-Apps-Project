/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'

import './ChatTab.css'

import React, { useContext, useState } from 'react'
import Chats from './Chats'

import { WebSocketContext } from '../context/WebScoketContext'
import { Timestamp } from 'rxjs'

// export default function ChatTab() {
//   return (
//     <div>ChatTab</div>
//   )
// }

export interface Chatroom {
	chatroomId: number
	senderId: number
	text: string
	lastUpdateTime: string
}

const ChatTab: React.FC = () => {
	const [key, setKey] = useState('allChats')
	const socket = useContext(WebSocketContext)
	const chatListInitialState: Chatroom[] = [
		{
			chatroomId: 0,
			senderId: 0,
			text: 'Loading',
			lastUpdateTime: '2022-09-09 11:11:49.936 +0800'
		}
	]
	const [chatrooms, setChatrooms] = useState(chatListInitialState)

	socket.on('chatrooms', (chatrooms) => {
		setChatrooms(chatrooms)
	})

	// TODO: create room with user 1983 whenever a new user come in
	// socket.emit('createRoom', {workerId: 1983, userId: 'current userId'} )

	console.log('The Chatrooms are: ' + chatrooms)

	return (
		<>
			<Tabs
				fill
				defaultActiveKey={key}
				activeKey={key}
				onSelect={(k) => setKey(k!)}
				className='mb-3'
				id='chatTab'>
				<Tab eventKey='allChats' title='全部對話'>
					{chatrooms.map((chatroom) => (
						<Chats chatroom={chatroom} />
					))}
				</Tab>
				<Tab eventKey='storedChats' title='已收藏對話'>
					{chatrooms.map((chatroom) => (
						<Chats chatroom={chatroom} />
					))}
				</Tab>
			</Tabs>
		</>
	)
}

export default ChatTab
