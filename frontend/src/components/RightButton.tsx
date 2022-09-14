/** @jsxImportSource @emotion/react */
import React from 'react'
import { IonButton, IonIcon} from '@ionic/react'

import {  chevronForwardOutline } from 'ionicons/icons'

export default function RightButton(props:{
	thisPath:string,}) {

	return (
		<IonButton routerLink={props.thisPath} size='large' fill='clear' >
			<IonIcon className='icon' icon={chevronForwardOutline} />
		</IonButton>
	)
}
