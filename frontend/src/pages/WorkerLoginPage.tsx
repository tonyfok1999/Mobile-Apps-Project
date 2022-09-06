/** @jsxImportSource @emotion/react */
import React from 'react'
import { NavLink } from 'react-router-dom'
import LoginBox from '../components/LoginBox'
import Logo from '../components/Logo'
import { css } from '@emotion/react'

export default function WorkerLoginPage() {
	return (
		<div
			css={css`
				max-width: 100%;
				max-height: 100%;
				display: flex;
				flex-direction: column;
				img {
					margin: auto;
					max-width: 60%;
				}
				h1 {
					margin: auto;
				}
				.container {
					margin: auto;
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
		</div>
	)
}
