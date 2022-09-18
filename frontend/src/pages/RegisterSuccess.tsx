/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { IonPage } from '@ionic/react'
import React from 'react'
import { NavLink } from 'react-router-dom'

export default function RegisterSuccess() {
	return (
		<IonPage
			css={css`
				display: flex;
				div {
					margin: auto;
					font-weight: bold;
				}
				a {
					margin-left: auto;
					margin-right: auto;
					margin-bottom: 2rem;
					text-decoration: none;
					background: linear-gradient(
						45deg,
						rgb(56, 28, 129),
						rgb(254, 121, 89)
					);
					-webkit-background-clip: text;
					color: transparent;
				}
			`}>
			<div>成功註冊!</div>
			<NavLink to='/workerLoginPage'>OK</NavLink>
		</IonPage>
	)
}
