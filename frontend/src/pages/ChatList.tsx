
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import './ChatList.css'
import {
	IonToolbar,
	IonButtons,
	IonTitle,
	IonContent,
	IonHeader,
	IonItem,
	IonList,
	IonMenu,
	IonPage,
	IonIcon,
	IonLabel,
	IonListHeader,
	IonMenuToggle,
	IonButton,

} from '@ionic/react'
import { IoMenuSharp } from 'react-icons/io5'
import React, { useContext, useEffect, useState } from 'react'
import ChatTab from '../components/ChatTab'
import ClientTabBar from '../nav/ClientTabBar'
import { WebSocketContext } from '../context/WebScoketContext'


const ChatList: React.FC = () => {

	return (<>
		<IonMenu content-id='main-content'>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Menu</IonTitle>
				</IonToolbar>
			</IonHeader>

			<IonContent>
				<IonList>
					<IonListHeader>Navigate</IonListHeader>
					<IonMenuToggle auto-hide='false'>
						<IonItem button>
							<IonIcon slot='start' name='home'></IonIcon>
							<IonLabel>Home</IonLabel>
						</IonItem>
					</IonMenuToggle>
				</IonList>
			</IonContent>
		</IonMenu>

		<IonPage id='main-content' 
		css={css`
		
		ion-title{
			font-family:'IBM Plex Sans Condensed';
			font-size: 1.4rem;
			font-weight: normal;
		}
		
		ion-toolbar{
			--border-style: none;
		}
		
		svg{
			color: #0D0E10
		}


		
		`}>
			
			<IonHeader>
				<IonToolbar>
					<IonTitle>對話</IonTitle>
					<IonButtons slot='start'>
						<IonMenuToggle>
							<IonButton>
								<IoMenuSharp size={35} />
							</IonButton>
						</IonMenuToggle>
					</IonButtons>
				</IonToolbar>
			</IonHeader>

			<IonContent
				fullscreen={true}
				scrollEvents={true}
				onIonScrollStart={() => {}}
				onIonScroll={() => {}}
				onIonScrollEnd={() => {}}>
				<ChatTab />
			</IonContent>
			<ClientTabBar />
		</IonPage>
	</>
)}

export default ChatList
