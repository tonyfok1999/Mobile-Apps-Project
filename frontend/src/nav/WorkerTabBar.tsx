/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React from 'react'
import {
	IonTabs,
	IonRouterOutlet,
	IonTabBar,
	IonTabButton,
	IonIcon,
	IonLabel,
	IonContent,
	IonBadge
} from '@ionic/react'
import { chatbubbleEllipses, newspaper } from 'ionicons/icons'

const WorkerTabBar: React.FC = () => {
	return (
		<IonTabBar
			slot='bottom'
			css={css`
				height: 3rem;
			`}>
			<IonTabButton
				tab='workerOrderPage'
				className='workerOrderPage-icon'
				href='/tab/workerOrderPage'>
				<IonIcon size='large' icon={newspaper} />
			</IonTabButton>

			<IonTabButton tab='chatlist' href='/tabs/chatList'>
				<IonIcon
					size='large'
					className='chat-icon'
					icon={chatbubbleEllipses}
				/>
			</IonTabButton>
		</IonTabBar>
	)
}

export default WorkerTabBar
