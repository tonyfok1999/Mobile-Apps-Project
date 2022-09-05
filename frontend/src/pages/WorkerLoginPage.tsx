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
				display: flex;
				flex-direction: column;
				img {
					margin: auto;
				}
				h1 {
					margin: auto;
				}
				.container {
					margin: auto;
				}
			`}>
			<Logo />
			<LoginBox />
			<span>師傅想加入我們?</span>
			<NavLink to='/workerLogin'>註冊</NavLink>
		</div>
	)
}
