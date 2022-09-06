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
import { chatbubblesOutline, micOutline } from 'ionicons/icons'

export default function DetailsOfRecordingContent() {
	return (
		<IonGrid
			css={css`
				.center {
					display: flex;
					justify-content: center;
					align-items: center;
				}
			`}>
			<IonRow>
				<IonCol size='6' className='center'>
					<IonButton fill='clear' onClick={() => {}}>
						<IonIcon className='micIcon' icon={micOutline} />
					</IonButton>
				</IonCol>
				<IonCol size='6' className='center'>
					<IonButton fill='clear' onClick={() => {}}>
						<IonIcon slot='chatIcon' icon={chatbubblesOutline} />
					</IonButton>
				</IonCol>
			</IonRow>
		</IonGrid>
	)
}
