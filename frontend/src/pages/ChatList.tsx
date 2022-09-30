
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import './ChatList.css'
import {
	IonToolbar,
	IonButtons,
	IonTitle,
	IonContent,
	IonHeader,
	IonPage,
	IonMenuToggle,
	IonButton,

} from '@ionic/react'
import { IoMenuSharp } from 'react-icons/io5'
import React from 'react'
import ChatTab from '../components/ChatTab'
import ClientTabBar from '../nav/ClientTabBar'
import { useAppSelector } from '../store'
import WorkerTabBar from '../nav/WorkerTabBar'


const ChatList: React.FC = () => {
	const isWorker = useAppSelector(
		(state) => state.auth.user?.is_worker
	) ?? false
	return (<>
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
			{ isWorker? <WorkerTabBar/>:<ClientTabBar />}
		</IonPage>
	</>
)}

export default ChatList
