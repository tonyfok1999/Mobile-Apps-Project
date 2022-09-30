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
	useIonAlert,
} from '@ionic/react'

import { trash, archive, arrowUndo } from 'ionicons/icons'
import { Chatroom } from './ChatTab'
import { useAppSelector } from '../store'
import SocketContext from '../socket/SocketContext'
import profilepic from '../srcImage/blank-profile-picture.png'

export default function Chats(props: { chatroom: Chatroom }) {
	const userId = useAppSelector((state) => state.auth.user!.id)
	const { socket } = useContext(SocketContext)
	const [presentAlert] = useIonAlert()
	const [chatroom, setChatroom] = useState(props.chatroom)
	const archiveRef = React.useRef() as React.MutableRefObject<HTMLIonItemSlidingElement>

	useEffect(() => {

		setChatroom(props.chatroom)

		console.log('new lifecycle in chatroom')

		return () => {
			console.log('unmounting')
		}
	}, [])

	return (
		<>
			<IonList>
				<IonItemSliding id='item100' ref={archiveRef}>
					<IonItem
						routerLink={`/chatroom/${props.chatroom.chatroom_id}`}>
						<IonAvatar slot='start'>
							<IonImg src={profilepic}></IonImg>
						</IonAvatar>
						<IonLabel>
							<h2>
								{props.chatroom.attendees
									.filter(
										(attendee) =>
											attendee.user_id !== userId
									)
									.map((attendee) => attendee.nickname)}
							</h2>
							<p>{props.chatroom.text}</p>
						</IonLabel>
						<IonNote slot='end'>
						</IonNote>
					</IonItem>

					{props.chatroom.is_favourite ? (
						<IonItemOptions side='start' >
							<IonItemOption
								key={props.chatroom.chatroom_id}
								color='success'
								onClick={() =>{
									socket?.emit('bookmarkChat', {
										chatroomId: props.chatroom.chatroom_id,
										userId: userId
									})

									archiveRef.current.close()
								}
								}
								expandable>
								<IonIcon slot='icon-only' icon={arrowUndo} />
							</IonItemOption>
						</IonItemOptions>
					) : (
						<IonItemOptions side='start'>
							<IonItemOption
								key={chatroom.chatroom_id}
								color='tertiary'
								onClick={() =>{
									socket?.emit('bookmarkChat', {
										chatroomId: props.chatroom.chatroom_id,
										userId: userId
									})
									archiveRef.current.close()
								}}
								expandable>
								<IonIcon slot='icon-only' icon={archive} />
							</IonItemOption>
						</IonItemOptions>
					)}

					<IonItemOptions side='end'>
						<IonItemOption
							color='danger'
							onClick={() =>{

								presentAlert({
									header: '刪除聊天室',
									subHeader: '在雙方手機上同時刪除聊天室',
									buttons: [
										{
											text: '取消',
											role: 'cancel',
											handler: () => {
												console.log('delete cancelled')
											}
										},
										{
											text: '確定',
											role: 'confirm',
											handler: () => {
												socket?.emit(
													'deleteChat',
													props.chatroom.chatroom_id
												)
												archiveRef.current.close()
											}
										}
									]
								})
							}}
							expandable>
							<IonIcon slot='icon-only' icon={trash} />
						</IonItemOption>
					</IonItemOptions>
				</IonItemSliding>
			</IonList>
		</>
	)
}
