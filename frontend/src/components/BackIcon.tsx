/** @jsxImportSource @emotion/react */
import React from 'react'
import { IonButton, IonIcon, IonGrid, IonRow, IonCol } from '@ionic/react'

import { arrowBackOutline } from 'ionicons/icons'

export default function BackIcon(props:{
	thisPath:string,}) {

	return (
		<IonButton routerLink={props.thisPath} size='large' fill='clear' >
			<IonIcon className='icon' icon={arrowBackOutline} />
		</IonButton>
	)
}
