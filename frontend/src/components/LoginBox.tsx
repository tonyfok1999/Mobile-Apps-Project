/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { css } from '@emotion/react'
import LoginMethods from './LoginMethods'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Method } from 'ionicons/dist/types/stencil-public-runtime'
import { useIonAlert } from '@ionic/react'

export default function LoginBox() {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors }
	} = useForm()

	const history = useHistory()

	const [presentAlert] = useIonAlert()

	// const [submitData, setSubmitData] = useState<{
	// 	email: string | null
	// 	password: string | null
	// }>()

	// const [isLogin, setIsLogin] = useState<boolean>(false)

	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		const res = await fetch('http://localhost:8000/user/login', {
	// 			method: 'POST',
	// 			headers: {
	// 				'Content-Type': 'application/x-www-form-urlencoded'
	// 			},
	// 			body: JSON.stringify(submitData)
	// 		})
	// 		const fetchData = await res.json()
	// 		setIsLogin(fetchData.loginState)
	// 	}
	// 	if (submitData) {
	// 		fetchData()
	// 	}
	// }, [submitData])

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
			`}>
			<h1>登入</h1>
			<form
				onSubmit={handleSubmit(async (body) => {
					const res = await fetch(
						'http://localhost:8000/user/login',
						{
							method: 'POST',
							headers: {
								'Content-Type': 'application/json'
							},
							body: JSON.stringify(body)
						}
					)
					const fetchData = await res.json()
					if (fetchData.loginState === true) {
						history.push('/workerOrderPage')
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
				<input
					type='password'
					placeholder='密碼'
					{...register('password', { required: true })}
				/>
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
