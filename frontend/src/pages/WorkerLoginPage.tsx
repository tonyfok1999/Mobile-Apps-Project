/** @jsxImportSource @emotion/react */
import React from 'react'
import { NavLink } from 'react-router-dom'
import LoginBox from '../components/LoginBox'
import Logo from '../components/Logo'
import { css } from '@emotion/react'
import { IonPage } from '@ionic/react'

export default function WorkerLoginPage() {
	return (
		<IonPage
			css={css`
				display: flex;
				flex-direction: column;
				justify-content: stretch;
				img {
					margin-left: auto;
					margin-right: auto;
					margin-top: 3rem;
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
			<Logo />
			<LoginBox />
			<span>
				師傅想加入我們?
				<NavLink to='/workerRegisterPage'>註冊</NavLink>
			</span>
		</IonPage>
	)
}
