/** @jsxImportSource @emotion/react */
import React from 'react'
import {
	IonButtons,
	IonToolbar,
	IonBackButton,
	IonTitle,
	IonButton,
	IonIcon,
	IonMenuButton,
	IonContent,
	IonGrid,
	IonRow,
	IonCol
} from '@ionic/react'

import { css } from '@emotion/react'
import {  chatbubbleEllipsesOutline, micOutline } from 'ionicons/icons'

export default function DetailsOfRecordingContent() {
	return (
		<IonGrid
			css={css`
				.center {
					/* min-width: 50%; */
					display: flex;
					justify-content: center;
					align-items: center;
				}
				.icon{
					
					min-width :100%;
				}
			`}>
			<IonRow>
				<IonCol size='6' className='center'>
					<IonButton size='large' fill='clear' routerLink="/" >
						<IonIcon className='icon' icon={micOutline} />
					</IonButton>
				</IonCol>
				<IonCol size='6' className='center'>
					<IonButton size='large' fill='clear' onClick={() => {}}>
						<IonIcon className='icon' icon={chatbubbleEllipsesOutline} />
					</IonButton>
				</IonCol>
			</IonRow>
		</IonGrid>
	)
}
