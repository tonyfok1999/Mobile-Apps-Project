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
		<IonPage>
			<IonContent
				css={css`
					display: flex;
					flex-direction: column;
					justify-content: stretch;

					ion-button {
						width: 5rem;
						display: block;
					}
					img {
						display: block;
						margin-left: auto;
						margin-right: auto;
						margin-bottom: 1rem;
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
						display: block;
						width: 10.5rem;
						margin-top: 2.3rem;
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
