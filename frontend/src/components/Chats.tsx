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
	IonContent,
	IonHeader,
	IonMenu,
	IonRouterOutlet,
	IonTitle,
	IonToolbar,
	IonAvatar,
	IonImg
} from '@ionic/react'

import {
	heart,
	trash,
	star,
	archive,
	ellipsisHorizontal,
	ellipsisVertical
} from 'ionicons/icons'

export const Chats: React.FC = () => (
	<>
		<IonList>
			{/* Multi-line sliding item with icon options on both sides */}
			<IonItemSliding id='item100'>
				<IonItem routerLink='/chatroom/1'>
					<IonAvatar slot='start'>
						<IonImg src='https://picsum.photos/id/237/64/64'></IonImg>
					</IonAvatar>
					<IonLabel>
						<h2>HubStruck Notifications</h2>
						<p>
							A new message in your network Oceanic Next has
							joined your network
						</p>
					</IonLabel>
					<IonNote slot='end'>10:45 AM</IonNote>
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

			{/* Multi-line sliding item with icon options on both sides */}
			<IonItemSliding id='item100'>
				<IonItem routerLink='/chatroom/2'>
					<IonAvatar slot='start'>
						<IonImg src='https://picsum.photos/id/89/64/64'></IonImg>
					</IonAvatar>
					<IonLabel>
						<h2>HubStruck Notifications</h2>
						<p>
							A new message in your network Oceanic Next has</p>
							<p>joined your network
						</p>
					</IonLabel>
					<IonNote slot='end'>10:45 AM</IonNote>
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

export default Chats
