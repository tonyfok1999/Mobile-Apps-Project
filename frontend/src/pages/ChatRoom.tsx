/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import {
	IonToolbar,
	IonButtons,
	IonTitle,
	IonContent,
	IonHeader,
	IonPage,
	IonButton,
	IonAvatar,
	IonImg,
	IonBackButton,
	IonLabel,
	IonFooter
} from '@ionic/react'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { IoArrowBackSharp } from 'react-icons/io5'
import { useParams } from 'react-router'
import ChatInput from '../components/ChatInput'
import { useVirtualizer } from '@tanstack/react-virtual'
import Chats from '../components/Chats'
import ChatContainer from '../components/ChatContainer'
import { useAppDispatch, useAppSelector } from '../store'
import MessageBubble from '../components/MessageBubble'
import { WebSocketContext } from '../context/WebScoketContext'
import { loadChatrooms } from '../redux/chatroom/action'
import { useSocket } from '../hooks/useSocket'
import SocketContext from '../socket/SocketContext'

export interface Message {
	sender_id: number
	text?: string
	created_at?: Date
}

const Chatroom: React.FC = () => {
	const params = useParams<{ chatroomId: string }>()
	const chatrooms = useAppSelector((state) => state.chatroom.chatrooms)
	const userId = useAppSelector((state) => state.auth.user!.id)
	const chatroomId = parseInt(params.chatroomId)
	const dispatch = useAppDispatch()

	const initialState: Message[] | null = []

	const [messages, setMessages] = useState<Message[]>(initialState)
	const [chats, setChats] = useState(chatrooms)

	// const socket = useContext(WebSocketContext)
	const { socket } = useContext(SocketContext)

	const token = localStorage.getItem('token')

	const scrollRef = React.useRef() as React.MutableRefObject<HTMLDivElement>

	// useEffect(() => {
	// 	scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
	// }, [messages, setMessages])

	useEffect(() => {
		const getMessages = async () => {
			const res = await fetch(
				`${process.env.REACT_APP_BACKEND_URL}/chatroom/${chatroomId}/message`,
				{ headers: { Authorization: `Bearer ${token}` } }
			)
			const json = await res.json()
			console.log(json)
			console.log('calling getMessages')
			setMessages(() => json)
		}

		getMessages()

		console.log('container lifecycle starting')

		socket?.on('onMessage', (data) => {
			console.log('onMessage event received')
			console.log(data)
			setMessages((prev) => [...prev, data])
		})

		// socket.on('newChatroom', (chatroom) => {
		// 	setChats((prev)=>[...prev, chatroom])
		// 	console.log({chatroom: chats})
		// })

		return () => {
			console.log('Unregistering Event')
			socket?.off('onMessage')
		}
	}, [token, chatroomId])

	console.log(`message: ` + JSON.stringify(messages))

	return (
		<>
			<IonPage
				css={css`
					ion-avatar {
						padding-left: 20px;
						align-items: center;
						display: flex;
					}

					.avatar {
						padding-left: 20px;
						align-items: center;
						display: flex;

						img {
							height: 50px;
							border-radius: 100px;
						}

						.username {
							padding-left: 20px;
							font-weight: bold;
						}
					}

					ion-img {
						width: 100%;
					}

					.input-container {
						height: 2.15rem;
						bottom: 0;
						background: white;
					}
				`}>
				<IonHeader>
					<IonToolbar
						css={css`
							--border-style: none;
						`}>
						<IonButtons slot='start'>
							<IonBackButton text='' defaultHref='/tabs/chatlist'>
								<IoArrowBackSharp size='1.5rem' />
							</IonBackButton>
						</IonButtons>
						{/* <IonAvatar>
							<IonImg src='https://picsum.photos/id/237/64/64'></IonImg>
							<div className='username'>陳師傅</div>
						</IonAvatar> */}

						<div className='avatar'>
							<img src='https://picsum.photos/id/237/64/64'></img>
							<div className='username'>
								{
									chats.filter(
										(chatroom) => chatroom.chatroom_id === chatroomId
									)[0]?.attendees
									.filter(
										(attendee) =>
											attendee.user_id !== userId
									)[0].nickname
								}
							</div>
						</div>
					</IonToolbar>
				</IonHeader>

				<IonContent>
					<div>
						{messages.map((message, idx) => (
							<div ref={scrollRef}>
								<MessageBubble key={idx} content={message} />
							</div>
						))}
					</div>
				</IonContent>

				<IonFooter>
					<ChatInput />
				</IonFooter>
			</IonPage>
		</>
	)
}

export default Chatroom
