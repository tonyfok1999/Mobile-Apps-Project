/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import LoginMethods from '../components/LoginMethods'

export default function WorkerRegisterPage() {
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
	}

	const history = useHistory()

	return (
		<div
			css={css`
				display: flex;
				flex-direction: column;
				align-items: center;
				div:nth-of-type(1) {
					margin-left: 60%;
					a {
						text-decoration: none;
						color: #fa7268;
						font-weight: bold;
					}
				}
				h1 {
					color: #fa7268;
					font-weight: bold;
				}
				div:nth-of-type(2) {
					color: #777777;
					margin: 1rem;
				}
				form {
					display: flex;
					flex-direction: column;
					width: 95%;
					input {
						border: none;
						border-bottom: solid 1px #cccddd;
						display: block;
						margin-top: 1.5rem;
					}
					a {
						margin-left: auto;
						font-size: 0.6rem;
						color: #777777;
						text-decoration: none;
					}
					input[type='submit'] {
						position: absolute;
						padding: 0;
						width: 3rem;
						bottom: 3rem;
						left: 0;
						right: 0;
						margin-left: auto;
						margin-right: auto;
						background: linear-gradient(
							45deg,
							rgb(56, 28, 129),
							rgb(254, 121, 89)
						);
						-webkit-background-clip: text;
						color: transparent;
						border-bottom: none;
						font-weight: bold;
					}
				}
			`}>
			<div>
				已經註冊? <NavLink to='/workerLoginPage'>登入</NavLink>
			</div>
			<h1>師傅註冊</h1>
			<LoginMethods />
			<div>或</div>
			<form onSubmit={handleSubmit}>
				<input type='text' placeholder='顯示名稱*' />
				<input type='email' placeholder='電郵*' />
				<input type='password' placeholder='密碼*' />
				<input type='password' placeholder='確定密碼*' />
				<input type='number' placeholder='聯絡電話*' />
				<input
					type='submit'
					value='下一步'
					onClick={() => {
						history.push('/')
					}}
				/>
			</form>
		</div>
	)
}
