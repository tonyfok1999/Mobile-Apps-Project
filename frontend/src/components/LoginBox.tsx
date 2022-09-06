/** @jsxImportSource @emotion/react */
import React from 'react'
import { NavLink } from 'react-router-dom'
import { css } from '@emotion/react'
import LoginMethods from './LoginMethods'

export default function LoginBox() {
	return (
		<div
			className='container'
			css={css`
				display: flex;
				width: 90%;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				box-sizing: border-box;
				box-shadow: 0px 0px 10px #cccddd;
				border-radius: 1rem;
				padding: 0.5rem;

				h1 {
					color: #fa7268;
					font-weight: bold;
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
						border-radius: 1rem;
						border-bottom: none;
						padding: 0.5rem;
						color: #ffffff;
						font-weight: bold;
						background: linear-gradient(
							45deg,
							rgb(56, 28, 129),
							rgb(254, 121, 89)
						);
					}
				}
				> div {
					display: flex;
					flex-direction: column;
					align-items: center;
					margin: 1rem;
					div {
						color: #777777;
					}
				}
			`}>
			<h1>登入</h1>
			<form action='#'>
				<input type='text' placeholder='電郵' />
				<input type='password' placeholder='密碼' />
				<NavLink to='#'>忘記密碼?</NavLink>
				<input type='submit' value='登入' />
			</form>
			<div>
				<div>或</div>
				<LoginMethods />
			</div>
		</div>
	)
}
