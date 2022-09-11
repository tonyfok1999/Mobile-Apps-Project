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
import React, { useEffect } from 'react'
import { IoArrowBackSharp } from 'react-icons/io5'
import { useParams } from 'react-router'
import ChatInput from '../components/ChatInput'
import { useVirtualizer } from '@tanstack/react-virtual'
import Chats from '../components/Chats'
import ChatContainer from '../components/ChatContainer'
import { useAppDispatch } from '../store'

const Chatroom: React.FC = () => {
	const params = useParams<{ chatroomId: string }>()

	// const handleSendMessage = async (message: Message) => {}

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

					.input-container{
					height: 2.15rem;
					bottom: 0;
					background: white;
				}
				`}>
				<IonHeader>
					<IonToolbar css={css`--border-style: none;`}>
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
							<div className='username'>陳師傅</div>
						</div>
					</IonToolbar>
				</IonHeader>
				
				<IonContent>
				<ChatContainer/>
				</IonContent>

				<IonFooter>
				<ChatInput/>
				</IonFooter>
			</IonPage>
		</>
	)
}

export default Chatroom
