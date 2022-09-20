/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'

import './ChatTab.css'

import React, { useContext, useEffect, useState } from 'react'
import Chats from './Chats'

import { WebSocketContext } from '../context/WebScoketContext'
import { Timestamp } from 'rxjs'


import { useSelector } from 'react-redux'
import { useAppDispatch, useAppSelector } from '../store'
import {
	startLoading,
	loadChatrooms,
	finishLoading
} from '../redux/chatroom/action'

// export default function ChatTab() {
//   return (
//     <div>ChatTab</div>
//   )
// }
export interface Chatroom {
	chatroom_id: number
    nickname?: string
	sender_id: number
	text: string
	lastUpdateTime: string
	attendees: Attendee[]

}

export interface Attendee {
	user_id: number, nickname: string
}

const ChatTab: React.FC = () => {
	const [key, setKey] = useState('allChats')
	const socket = useContext(WebSocketContext)
	const token = localStorage.getItem('token')
	const userId = useAppSelector((state) => state.auth.user!.id)
	const dispatch = useAppDispatch()
	console.log('userid' + userId)
	const [chatlist, setChatlist] = useState<Chatroom[]>([])

	// const chatListInitialState: Chatroom[] = [
	// 	{
	// 		chatroom_id: 0,
	// 		sender_id: 0,
	// 		text: 'Loading',
	// 		lastUpdateTime: '2022-09-09 11:11:49.936 +0800'
	// 	}
	// ]
	// const [chatrooms, setChatrooms] = useState(chatListInitialState)

	useEffect(() => {
		;(async () => {
			dispatch(startLoading())

			const res = await fetch(
				`${process.env.REACT_APP_BACKEND_URL}/chatroom/${userId}`,
				{ headers: { Authorization: `Bearer ${token}` } }
			)

			const chatrooms: Chatroom[] = await res.json()
			
			setChatlist(chatrooms)
			dispatch(loadChatrooms(chatrooms))

			dispatch(finishLoading())
		})()

			socket.on('onChatroom', (chatrooms) => {
				dispatch(startLoading())
				dispatch(loadChatrooms(chatrooms))
				setChatlist(chatrooms)
				dispatch(finishLoading())
			})

			return () => {
				console.log('Unregistering Event')
				socket.off('chatrooms')
			}
		
	}, [token])



	// TODO: create room with user 1983 whenever a new user come in
	// socket.emit('createRoom', {workerId: 1983, userId: 'current userId'} )
	
	console.log('The Chatrooms are: ' + JSON.stringify(chatlist))

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
					{chatlist.map((chat, idx) => (
						<Chats key={idx} chatroom={chat} />
					))}
				</Tab>
				<Tab eventKey='storedChats' title='已收藏對話'>
				</Tab>
			</Tabs>
		</>
	)
}

export default ChatTab
