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
	IonLabel
} from '@ionic/react'
import React from 'react'
import { IoArrowBackSharp } from 'react-icons/io5'
import { useParams } from 'react-router'

const Chatroom: React.FC = () => {
	const params = useParams<{ chatroomId: string }>()

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
				`}>
				<IonHeader>
					<IonToolbar>
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

				<IonContent
					fullscreen={true}
					scrollEvents={true}
					onIonScrollStart={() => {}}
					onIonScroll={() => {}}
					onIonScrollEnd={() => {}}>
					Chat{params.chatroomId}
				</IonContent>
			</IonPage>
		</>
	)
}

export default Chatroom
