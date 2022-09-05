import {
	IonToolbar,
	IonButtons,
	IonBackButton,
	IonTitle,
	IonContent,
	IonHeader,
	IonItem,
	IonList,
	IonMenu
} from '@ionic/react'
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
		{/* <IonMenu side='start' menuId='custom' className='my-custom-menu'>
			<IonHeader>
				<IonToolbar color='tertiary'>
					<IonTitle>Custom Menu</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList>
					<IonItem>Menu Item</IonItem>
					<IonItem>Menu Item</IonItem>
					<IonItem>Menu Item</IonItem>
					<IonItem>Menu Item</IonItem>
					<IonItem>Menu Item</IonItem>
				</IonList>
			</IonContent>
		</IonMenu> */}

		<IonHeader>
			<IonToolbar>
				<IonButtons slot='start'>
					<IonBackButton defaultHref='/' />
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
	</>
)

export default ChatList
