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
import { arrowBackOutline, eyeOffOutline, eyeOutline } from 'ionicons/icons'

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
	const [icon1, setIcon1] = useState(eyeOutline)
	const [show1, setShow1] = useState('password')
	const [icon2, setIcon2] = useState(eyeOutline)
	const [show2, setShow2] = useState('password')
	return (
		<IonPage>
			<IonContent
				css={css`
					.line {
						border-bottom: solid 1px #cccddd;
						width: 100%;
						margin-bottom: 0.5rem;
					}
					ion-button {
						width: 5rem;
						display: block;
					}

					input {
						width: 19rem;
					}

					h1 {
						display: flex;
						color: #fa7268;
						font-weight: bold;
						margin-top: 1rem;
						justify-content: center;
					}
					.methods {
						display: flex;
						flex-direction: column;
						align-items: center;
						div {
							margin: 1rem;
						}
					}
					form {
						display: flex;
						flex-direction: column;
						width: 95%;
						input {
							margin-left: 0.5rem;
							border: none;
							display: block;
							margin-top: 1.5rem;
						}
						input[type='submit'] {
							display: block;
							padding: 0;
							width: 3rem;
							margin-top: 3rem;
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
					.passwordContainer {
						position: relative;
					}
					.icon {
						position: absolute;
						top: 2rem;
						right: 0;
					}
					.error {
						margin-left: 1rem;
						font-size: 0.7rem;
						color: red;
					}
				`}>
				<IonButton
					size='large'
					fill='clear'
					routerLink='/workerLoginPage'>
					<IonIcon className='icon' icon={arrowBackOutline} />
				</IonButton>
				<h1>師傅註冊</h1>
				<div className='methods'>
					<LoginMethods />
					<div>或</div>
				</div>
				<form
					onSubmit={handleSubmit((formData) => {
						dispatch(
							storeAccount({
								nickname: formData.nickname,
								email: formData.email,
								password: formData.confirmedPassword,
								phone: formData.phone,
								isLocalRegister: true
							})
						)
					})}>
					<input
						type='text'
						placeholder='顯示名稱*'
						{...register('nickname', { required: true })}
					/>
					<div className='line'></div>
					<input
						type='email'
						placeholder='電郵*'
						{...register('email', {
							required: true,
							onChange: async () => {
								const res = await fetch(
									`${process.env.REACT_APP_BACKEND_URL}/user/checkEmail`,
									{
										method: 'POST',
										headers: {
											'Content-Type': 'application/json',
											Authorization: `whatever`
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
					<div className='line'></div>
					{isDuplicateEmail && (
						<div className='error'> This email is duplicated</div>
					)}
					<div className='passwordContainer'>
						<input
							type={show1}
							placeholder='密碼*'
							{...register('password', { required: true })}
						/>
						<IonIcon
							className='icon'
							icon={icon1}
							onClick={() => {
								if (show1 === 'password') {
									setShow1('text')
									setIcon1(eyeOffOutline)
								} else {
									setShow1('password')
									setIcon1(eyeOutline)
								}
							}}
						/>
					</div>
					<div className='line'></div>
					<div className='passwordContainer'>
						<input
							type={show2}
							placeholder='確定密碼*'
							{...register('confirmedPassword', {
								required: true,
								onBlur: () => {
									watch('password') ==
									watch('confirmedPassword')
										? setIsSamePassword(true)
										: setIsSamePassword(false)
								}
							})}
						/>
						<IonIcon
							className='icon'
							icon={icon2}
							onClick={() => {
								if (show2 === 'password') {
									setShow2('text')
									setIcon2(eyeOffOutline)
								} else {
									setShow2('password')
									setIcon2(eyeOutline)
								}
							}}
						/>
					</div>
					<div className='line'></div>
					{!isSamePassword && (
						<div className='error'>
							This is not the same of above
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
					<div className='line'></div>
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
