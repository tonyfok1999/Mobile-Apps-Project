import { IonPage } from '@ionic/react'
import React from 'react'
import { NavLink } from 'react-router-dom'

export default function RegisterSuccess() {
	return (
		<IonPage>
			<div>成功註冊</div>
			<NavLink to='/workerLoginPage'>OK</NavLink>
		</IonPage>
	)
}
