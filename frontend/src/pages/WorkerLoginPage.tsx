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
					display: flex;
					justify-content: center;
					margin-top: 4rem;
					a {
						text-decoration: none;
						color: #fa7268;
					}
				}
			`}>
			<Logo />
			<LoginBox />
			<span>
				師傅想加入我們?<NavLink to='/workerRegisterPage'>註冊</NavLink>
			</span>
		</div>
	)
}
