/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { useEffect, useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import LoginMethods from './LoginMethods'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Method } from 'ionicons/dist/types/stencil-public-runtime'
import { IonIcon, useIonAlert } from '@ionic/react'
import { useAppDispatch } from '../store'
import { loggedIn } from '../redux/auth/action'
import { eyeOffOutline, eyeOutline } from 'ionicons/icons'
import { loadToken } from '../redux/token/action'

export default function LoginBox() {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors }
	} = useForm()

	const history = useHistory()

	const [presentAlert] = useIonAlert()

	const dispatch = useAppDispatch()

	const [icon, setIcon] = useState(eyeOutline)
	const [show, setShow] = useState('password')

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

				input {
					width: 19rem;
				}

				.line {
					border-bottom: solid 1px #cccddd;
					width: 100%;
					margin-bottom: 1rem;
				}
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
						margin-left: auto;
						margin-right: auto;
						align-items: center;
						width: 19rem;
						border-radius: 1rem;
						border: none;
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
				.passwordContainer {
					position: relative;
				}
				.icon {
					position: absolute;
					top: 2rem;
					right: 0;
				}
			`}>
			<h1>登入</h1>
			<form
				onSubmit={handleSubmit(async (body) => {
					const res = await fetch(
						`${process.env.REACT_APP_BACKEND_URL}/worker-auth/login`,
						{
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
								Authorization: `whatever`
							},
							body: JSON.stringify(body)
						}
					)
					const fetchData = await res.json()
					if (fetchData.user) {
						const token = fetchData.access_token
						localStorage.setItem('token', token)
						dispatch(loggedIn(fetchData.user, token))
						dispatch(loadToken(token))
						history.replace('/tab/workerOrderPage')
					} else {
						presentAlert({
							header: '帳號或密碼錯誤',
							message: '請重新輸入',
							buttons: ['確定']
						})
					}
				})}>
				<input
					type='email'
					placeholder='電郵'
					{...register('email', { required: true })}
				/>
				<div className='line'></div>
				<div className='passwordContainer'>
					<input
						type={show}
						placeholder='密碼'
						{...register('password', { required: true })}
					/>

					<IonIcon
						className='icon'
						icon={icon}
						onClick={() => {
							if (show === 'password') {
								setShow('text')
								setIcon(eyeOffOutline)
							} else {
								setShow('password')
								setIcon(eyeOutline)
							}
						}}
					/>
				</div>
				<div className='line'></div>
				<input type='submit' value='登入' />
			</form>
			<div>
				<div>或</div>
				<LoginMethods />
			</div>
		</div>
	)
}
