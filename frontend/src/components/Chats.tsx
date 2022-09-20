import React from 'react'
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
	IonImg
} from '@ionic/react'

import { trash, archive } from 'ionicons/icons'
import { Attendee, Chatroom } from './ChatTab'
import { useAppSelector } from '../store'

export default function Chats(props: { chatroom: Chatroom }) {
	const userId = useAppSelector((state) => state.auth.user!.id)

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
								props.chatroom.attendees.filter(
									(attendee) => attendee.user_id !== userId
								).map((attendee) => attendee.nickname)
								}
							</h2>
							<p>{props.chatroom.text}</p>
						</IonLabel>
						<IonNote slot='end'>
							{props.chatroom.lastUpdateTime}
						</IonNote>
					</IonItem>

					<IonItemOptions side='start'>
						<IonItemOption
							color='tertiary'
							onClick={() => console.log('share clicked')}
							expandable>
							<IonIcon slot='icon-only' icon={archive} />
						</IonItemOption>
					</IonItemOptions>

					<IonItemOptions side='end'>
						<IonItemOption
							color='danger'
							onClick={() => console.log('share clicked')}
							expandable>
							<IonIcon slot='icon-only' icon={trash} />
						</IonItemOption>
					</IonItemOptions>
				</IonItemSliding>
			</IonList>
		</>
	)
}
