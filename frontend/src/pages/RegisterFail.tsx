import { IonPage } from '@ionic/react'
import React from 'react'
import { NavLink } from 'react-router-dom'

export default function RegisterFail() {
	return (
		<IonPage>
			<div>註冊有問題 請重新註冊</div>
			<NavLink to='/WorkerRegisterPage'>OK</NavLink>
		</IonPage>
	)
}
