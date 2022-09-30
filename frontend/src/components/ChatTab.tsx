import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import './ChatTab.css'
import React, { useContext, useEffect, useState } from 'react'
import Chats from './Chats'
import { useAppDispatch, useAppSelector } from '../store'
import {
	startLoading,
	loadChatrooms,
	finishLoading
} from '../redux/chatroom/action'
import SocketContext from '../socket/SocketContext'

export interface Chatroom {
	chatroom_id: number
	sender_id: number
	text: string
	lastUpdateTime: string
	attendees: Attendee[]
	is_favourite: boolean
}

export interface Attendee {
	user_id: number
	nickname: string
}

const ChatTab: React.FC = () => {
	const [key, setKey] = useState('allChats')
	const { socket } = useContext(SocketContext)
	const token = localStorage.getItem('token')
	const userId = useAppSelector((state) => state.auth.user!.id)
	const dispatch = useAppDispatch()
	console.log('userid' + userId)
	const [chatlist, setChatlist] = useState<Chatroom[]>([])

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

		const onChatroom = (chatrooms: Chatroom[]) => {
				console.log('onchatroom' + JSON.stringify(chatrooms))
				setChatlist(chatrooms)
				dispatch(loadChatrooms(chatrooms))
			}

		socket?.on('onChatroom', onChatroom)

		return () => {
			console.log('Unregistering Event')
			socket?.off('onChatroom', onChatroom)
		}
	}, [token,setChatlist])

	console.log('The Chatrooms in useState ' + JSON.stringify(chatlist))

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
					{chatlist
						.filter((chat) => !chat.is_favourite)
						.map((chat, idx) => (
							<Chats key={idx} chatroom={chat} />
						))}
				</Tab>
				<Tab eventKey='storedChats' title='已收藏對話'>
					{chatlist
						.filter((chat) => chat.is_favourite)
						.map((chat, idx) => (
							<Chats key={idx} chatroom={chat} />
						))}
				</Tab>
			</Tabs>
		</>
	)
}

export default ChatTab
