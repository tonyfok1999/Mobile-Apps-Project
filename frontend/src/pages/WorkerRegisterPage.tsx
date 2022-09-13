/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import {
	IonBackButton,
	IonButton,
	IonButtons,
	IonContent,
	IonHeader,
	IonIcon,
	IonPage,
	IonToolbar
} from '@ionic/react'
import React, { useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import LoginMethods from '../components/LoginMethods'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { storeAccount } from '../redux/register/action'

export default function WorkerRegisterPage() {
	const history = useHistory()
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors }
	} = useForm()

	const dispatch = useDispatch()

	const [cannotNextStep, setCannotNextStep] = useState<boolean>(true)
	const [isDuplicateEmail, setIsDuplicateEmail] = useState<boolean>(false)
	const [isSamePassword, setIsSamePassword] = useState<boolean>(true)

	return (
		<IonPage
			css={css`
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: stretch;
				div:nth-of-type(1) {
					display: flex;
					ion-button {
						position: absolute;
						left: 0;
					}
					span {
						position: absolute;
						right: 0;
					}
					a {
						text-decoration: none;
						color: #fa7268;
						font-weight: bold;
					}
				}
				h1 {
					color: #fa7268;
					font-weight: bold;
					margin-top: 5rem;
				}
				span:nth-of-type(1) {
					margin: 1rem;
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
						border-bottom: none;
						font-weight: bold;
						background: linear-gradient(
							45deg,
							rgb(56, 28, 129),
							rgb(254, 121, 89)
						);
						-webkit-background-clip: text;
						color: transparent;
					}
				}
			`}>
			<IonContent>
				<h1>師傅註冊</h1>
				<LoginMethods />
				<div>或</div>
				<form
					onSubmit={handleSubmit((formData) => {
						dispatch(
							storeAccount({
								nickname: formData.nickname,
								email: formData.email,
								password: formData.confirmedPassword,
								phone: formData.phone
							})
						)
					})}>
					<input
						type='text'
						placeholder='顯示名稱*'
						{...register('nickname', { required: true })}
					/>
					<input
						type='email'
						placeholder='電郵*'
						{...register('email', {
							required: true,
							onChange: async () => {
								const res = await fetch(
									'http://localhost:8000/user/checkEmail',
									{
										method: 'POST',
										headers: {
											'Content-Type': 'application/json'
										},
										body: JSON.stringify({
											email: watch('email')
										})
									}
								)
								const data = await res.json()
								data.isDuplicate
									? setIsDuplicateEmail(true)
									: setIsDuplicateEmail(false)
							}
						})}
					/>
					{isDuplicateEmail && (
						<div className='error'> this email is duplicated</div>
					)}
					<input
						type='password'
						placeholder='密碼*'
						{...register('password', { required: true })}
					/>
					<input
						type='password'
						placeholder='確定密碼*'
						{...register('confirmedPassword', {
							required: true,
							onBlur: () => {
								watch('password') == watch('confirmedPassword')
									? setIsSamePassword(true)
									: setIsSamePassword(false)
							}
						})}
					/>
					{!isSamePassword && (
						<div className='error'>
							the password is not the same of above
						</div>
					)}
					<input
						type='number'
						placeholder='聯絡電話*'
						{...register('phone', {
							required: true,
							onChange: () => {
								setCannotNextStep(false)
							}
						})}
					/>
					<input
						type='submit'
						value='下一步'
						disabled={
							cannotNextStep ||
							isDuplicateEmail ||
							!isSamePassword
						}
						onClick={() => {
							history.push('/workerRegisterPageForTypeOfService')
						}}
					/>
				</form>
			</IonContent>
		</IonPage>
	)
}
