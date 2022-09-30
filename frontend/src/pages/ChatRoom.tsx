/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import {
	IonToolbar,
	IonButtons,
	IonContent,
	IonHeader,
	IonPage,
	IonFooter
} from '@ionic/react'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import ChatInput from '../components/ChatInput'
import { useAppSelector } from '../store'
import MessageBubble from '../components/MessageBubble'
import SocketContext from '../socket/SocketContext'
import profilepic from '../srcImage/blank-profile-picture.png'
import { useIonAlert } from '@ionic/react'
import BackIcon from '../components/BackIcon'
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

	const initialState: Message[] | null = []

	const [messages, setMessages] = useState<Message[]>(initialState)
	const [chats, setChats] = useState(chatrooms)

	const { socket } = useContext(SocketContext)

	const token = localStorage.getItem('token')
	
	const [presentAlert] = useIonAlert()

	const scrollRef = React.useRef() as React.MutableRefObject<HTMLDivElement>

	useEffect(() => {
		scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
	}, [messages, setMessages])

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

		const onMessage = (data: any) => {
			console.log(data)
			if (data.status === '400') {
			presentAlert({
				header: '訊息錯誤',
				message: '聊天室已被刪除',
				buttons: ['確定']
			})
			return
		}
			console.log('onMessage event received')
			console.log(data)
			setMessages((prev) => [...prev, data])
		}

		socket?.on('onMessage', onMessage)

		return () => {
			console.log('Unregistering Event')
			socket?.off('onMessage', onMessage)
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
							<BackIcon thisPath={'/tabs/chatlist'}/>
						</IonButtons>

						<div className='avatar'>
							<img src={profilepic}></img>
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
