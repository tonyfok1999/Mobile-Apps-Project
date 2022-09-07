/** @jsxImportSource @emotion/react */
import {
	IonToolbar,
	IonButtons,
	IonBackButton,
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
	IonApp,
	IonButton,
	IonRouterOutlet,
	IonTabBar,
	IonTabButton,
	IonTabs,
	IonFooter
} from '@ionic/react'
import { IoMenuSharp } from 'react-icons/io5'
import React from 'react'
import styled from 'styled-components'
import ChatTab from '../components/ChatTab'
import { IonReactRouter } from '@ionic/react-router'
import {
	triangle,
	ellipse,
	square,
	call,
	person,
	settings
} from 'ionicons/icons'
import { Route, Redirect } from 'react-router'

import ClientTabBar from '../nav/ClientTabBar'
import { css } from '@emotion/react'

// export default function ChatList() {
//   return (
//     <div>ChatList</div>
//   )
// }

// const Toolbar = styled(IonToolbar)`height: 5vh`
const Title = styled(IonTitle)`
	position: absolute;
	text-align: center;
	font-weight: bold;
	font-size: 1.5rem;
`

const Header = styled(IonHeader)`
	display: flex;
	position: relative;
`

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

		<IonPage id='main-content'>
			
			<Header>
				<IonToolbar>
					<IonButtons slot='start'>
						<IonMenuToggle>
							<IonButton>
								<IoMenuSharp size={35} />
							</IonButton>
						</IonMenuToggle>
					</IonButtons><Title>對話</Title>
				</IonToolbar>
			</Header>

			<IonContent
				fullscreen={true}
				scrollEvents={true}
				onIonScrollStart={() => {}}
				onIonScroll={() => {}}
				onIonScrollEnd={() => {}}>
				<ChatTab />
			</IonContent>
		</IonPage>
	</>
)}

export default ChatList
