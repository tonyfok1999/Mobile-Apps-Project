/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import LoginBox from '../components/LoginBox'
import Logo from '../components/Logo'

import {
	IonButton,
	IonContent,
	IonHeader,
	IonIcon,
	IonPage,
	IonTitle,
	IonToolbar
} from '@ionic/react'
import { arrowBackOutline } from 'ionicons/icons'

export default function WorkerLoginPage() {
	return (
		<IonPage
			css={css`
				display: flex;
				flex-direction: column;
				justify-content: stretch;

				ion-button {
					width: 5rem;
				}
				img {
					margin-left: auto;
					margin-right: auto;
					max-width: 40%;
				}

				.container {
					margin-left: auto;
					margin-right: auto;
					h1 {
						margin: auto;
					}
				}
				> span {
					position: absolute;
					width: 10.5rem;
					bottom: 1rem;
					left: 0;
					right: 0;
					margin-left: auto;
					margin-right: auto;
					a {
						margin-left: 0.5rem;
						text-decoration: none;
						color: #fa7268;
						font-weight: bold;
					}
				}
			`}>
			<IonContent>
				<IonButton
					size='large'
					fill='clear'
					routerLink='/Speak/SpeakPage'>
					<IonIcon className='icon' icon={arrowBackOutline} />
				</IonButton>
				<Logo />
				<LoginBox />
				<span>
					師傅想加入我們?
					<NavLink to='/workerRegisterPage'>註冊</NavLink>
				</span>
			</IonContent>
		</IonPage>
	)
}
