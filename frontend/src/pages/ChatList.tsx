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
	IonButton
} from '@ionic/react'
import {IoMenuSharp} from "react-icons/io5"
import React from 'react'
import styled from 'styled-components'
import ChatTab from '../components/ChatTab'

// export default function ChatList() {
//   return (
//     <div>ChatList</div>
//   )
// }

// const Toolbar = styled(IonToolbar)`height: 5vh`
const Title = styled(IonTitle)`
	text-align: center;
	font-weight: bold;
	font-size: 1.5rem;
`

const ChatList: React.FC = () => (
	<>

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
				<IonHeader>
					<IonToolbar>
						<IonButtons slot='start'>
							<IonMenuToggle>
								<IonButton>
									<IoMenuSharp size={35} />
								</IonButton>
							</IonMenuToggle>
						</IonButtons>
						<Title>對話</Title>
					</IonToolbar>
				</IonHeader>

				<IonContent
					scrollEvents={true}
					onIonScrollStart={() => {}}
					onIonScroll={() => {}}
					onIonScrollEnd={() => {}}>
					<ChatTab />
				</IonContent>
			</IonPage>

	</>
)

export default ChatList
