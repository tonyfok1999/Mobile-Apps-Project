import React, { useContext, useEffect, useState } from 'react'
import {
	IonList,
	IonItemSliding,
	IonItem,
	IonLabel,
	IonItemOptions,
	IonItemOption,
	IonIcon,
	IonNote,
	IonAvatar,
	IonImg,
	useIonAlert
} from '@ionic/react'


import { trash, archive, arrowUndo} from 'ionicons/icons'
import { IoArrowUndo } from "react-icons/io5";
import { Attendee, Chatroom } from './ChatTab'
import { useAppDispatch, useAppSelector } from '../store'
import { WebSocketContext } from '../context/WebScoketContext'
import { useParams } from 'react-router'
import SocketContext from '../socket/SocketContext';

export default function Chats(props: { chatroom: Chatroom }) {
	const userId = useAppSelector((state) => state.auth.user!.id)
	const token = localStorage.getItem('token')
	// const socket = useContext(WebSocketContext)
	const { socket } = useContext(SocketContext)
	const [presentAlert] = useIonAlert();
	const [chatroom, setChatroom] = useState(props.chatroom)
	const dispatch = useAppDispatch()

	// useEffect(() => {
	// 	socket.on('newChatroom', (chatroom) => {
	// 		setChatroom(chatroom)
	// 		console.log({chatroom: chatroom})
	// 	})

	// 	socket.on('onChatroom', (chatroom) => {
	// 		dispatch(loadChatrooms(chatroom))
	// 	})

	// 	;(async () => {
	// 		const res = await fetch(
	// 			`${process.env.REACT_APP_BACKEND_URL}/chatroom/${}/user/:userId`,
	// 			{
	// 				headers: {
	// 					Authorization: `Bearer ${token}`
	// 				}
	// 			}
	// 		)
		
	// 		const chatroom = res.json()

	// 		setChatroom(chatroom)
		
	// 	})()

	// 	console.log({newChatroom: chatroom})
	// }, [])
	
	return (
		<>
			<IonList>
				{/* Multi-line sliding item with icon options on both sides */}
				<IonItemSliding id='item100'>
					<IonItem
						routerLink={`/chatroom/${props.chatroom.chatroom_id}`}>
						<IonAvatar slot='start'>
							<IonImg src='https://picsum.photos/id/237/64/64'></IonImg>
						</IonAvatar>
						<IonLabel>
							<h2>
								{
								chatroom.attendees.filter(
									(attendee) => attendee.user_id !== userId
								).map((attendee) => attendee.nickname)
								}
							</h2>
							<p>{props.chatroom.text}</p>
						</IonLabel>
						<IonNote slot='end'>
							{/* {chatroom.lastUpdateTime} */}
						</IonNote>
					</IonItem>

					<IonItemOptions side='start'>
						{
						props.chatroom.is_favourite?
							
						<IonItemOption
							color='success'
							onClick={() => socket?.emit('bookmarkChat', {chatroomId: chatroom.chatroom_id, userId: userId})}
							expandable>
							<IonIcon slot='icon-only' icon={arrowUndo} />
						</IonItemOption>
						:
						<IonItemOption
							color='tertiary'
							onClick={() => socket?.emit('bookmarkChat', {chatroomId: chatroom.chatroom_id, userId: userId})}
							expandable>
							<IonIcon slot='icon-only' icon={archive} />
						</IonItemOption>

						}
					</IonItemOptions>

					<IonItemOptions side='end'>
						<IonItemOption
							color='danger'
							onClick={() => 
								presentAlert({
									header: '刪除聊天室',
									subHeader: '在雙方手機上同時刪除聊天室',
									buttons: [
									  {
										text: '取消',
										role: 'cancel',
										handler: () => {
										  console.log('delete cancelled')
										},
									  },
									  {
										text: '確定',
										role: 'confirm',
										handler: () => {
											socket?.emit('deleteChat', chatroom.chatroom_id)
										},
									  },
									],

								  })
								}
							expandable>
							<IonIcon slot='icon-only' icon={trash} />
						</IonItemOption>
					</IonItemOptions>
				</IonItemSliding>
			</IonList>
		</>
	)
}
