/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import LoginBox from '../components/LoginBox'
import Logo from '../components/Logo'

import {
	IonButton,
	IonHeader,
	IonIcon,
	IonPage,
	IonTitle,
	IonToolbar
} from '@ionic/react'
import { arrowBackOutline } from 'ionicons/icons'

export default function WorkerLoginPage() {
	const [userInfo, setUserInfo] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch('localhost:8000/user/2')
			const data = await res.json()
			setUserInfo(data)
			console.log(userInfo)
		}

		// STEP 5：呼叫 fetchData 這個方法
		fetchData()
	}, [])

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
			<IonButton size='large' fill='clear' routerLink='/'>
				<IonIcon className='icon' icon={arrowBackOutline} />
			</IonButton>
			<Logo />
			{userInfo[0]}
			<LoginBox />
			<span>
				師傅想加入我們?
				<NavLink to='/workerRegisterPage'>註冊</NavLink>
			</span>
		</IonPage>
	)
}
