/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { useEffect, useState } from 'react'
import {
	IonApp,
	IonContent,
	IonHeader,
	IonIcon,
	IonLabel,
	IonPage,
	IonTitle,
	IonToolbar
} from '@ionic/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { $CombinedState } from 'redux'
import { useHistory } from 'react-router'
import { async } from 'rxjs'

export default function WorkerRegisterPageForTypeOfService() {
	// 0 = nothing to show
	// 1 = 風
	// 2 = 火
	// 3 = 水
	// 4 = 電
	const [showService, setShowService] = useState<number>(0)

	const [referenceTable, setReferenceTable] = useState<
		[
			{ id: number; region_id: number; district: string }[], //[0] districts
			{ id: number; type: string }[], // [1] service types
			{
				id: number
				service_type_id: number
				subtype: string
			}[] // [2] service subtypes
		]
	>()

	const [workerSubtypeId, setWorkerSubtypeId] = useState<number[]>([])

	const [cannotRegister, setCannotRegister] = useState<boolean>(true)

	useEffect(() => {
		const fetchReferenceTable = async () => {
			const res = await fetch(
				`${process.env.REACT_APP_BACKEND_URL}/referencesTable`,
				{
					headers: {
						Authorization: `whatever`
					}
				}
			)
			const data = await res.json()
			setReferenceTable(data)
		}

		fetchReferenceTable()
	}, [])

	const email = useSelector(
		(state: RootState) => state.register.account?.email
	)
	const nickname = useSelector(
		(state: RootState) => state.register.account?.nickname
	)
	const password = useSelector(
		(state: RootState) => state.register.account?.password
	)
	const phone = useSelector(
		(state: RootState) => state.register.account?.phone
	)
	const isLocalRegister = useSelector(
		(state: RootState) => state.register.account?.isLocalRegister
	)

	const history = useHistory()

	// email: string;
	// password: string;
	// nickname: string;
	// phone: number;
	// gender_id?: number | null;
	// profile_photo?: string | null;
	// is_worker: boolean;
	// worker_info_id?: number | null;
	// score?: number;

	return (
		<IonPage
			css={css`
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: stretch;
				ion-title {
					background-color: white;
				}
				.btn-outline-danger {
					margin-top: 1rem;
					margin-left: 1rem;
					margin-bottom: 1rem;
					padding: 0.5rem 1.5rem;
					border-radius: 2rem;
				}
				input[type='submit'] {
					width: 19rem;
					border-radius: 1rem;
					border: none;
					padding: 0.5rem;
					color: #ffffff;
					font-weight: bold;
					position: absolute;
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
				}
			`}>
			<IonContent>
				<form
					onSubmit={async (e) => {
						e.preventDefault()
					}}>
					<div>維修範圍*</div>
					{referenceTable &&
						referenceTable[1].map((types) => {
							return (
								<span key={types.id}>
									<input
										type='radio'
										className='btn-check'
										name='serviceTypes'
										id={types.type}
										value={types.type}
									/>
									<label
										className='btn btn-outline-danger'
										htmlFor={types.type}
										onClick={() => {
											setShowService(types.id)
										}}>
										{types.type}
									</label>
								</span>
							)
						})}

					{showService > 0 && <div>維修類別*</div>}
					{referenceTable &&
						referenceTable[2]
							.filter(
								(subtypes) =>
									subtypes.service_type_id == showService
							)
							.map((subtypes) => (
								<span key={subtypes.id}>
									<input
										type='checkbox'
										className='btn-check'
										name='serviceSubtypes'
										id={subtypes.subtype}
										value={subtypes.id}
										onChange={(e) => {
											setWorkerSubtypeId((last) => [
												...last,
												parseInt(e.target.value)
											])
											setCannotRegister(false)
										}}
									/>
									<label
										className='btn btn-outline-danger'
										htmlFor={subtypes.subtype}>
										{subtypes.subtype}
									</label>
								</span>
							))}

					<input
						type='submit'
						value='註冊'
						disabled={cannotRegister}
						onClick={async () => {
							const res = await fetch(
								`${process.env.REACT_APP_BACKEND_URL}/worker-auth/register`,
								{
									method: 'post',
									headers: {
										'Content-Type': 'application/json',
										Authorization: `whatever`
									},
									body: JSON.stringify({
										email: email,
										nickname: nickname,
										password: password,
										phone: phone,
										is_worker: true,
										workerSubtypeId: workerSubtypeId
									})
								}
							)
							if (!isLocalRegister) {
								const res = await fetch(
									`${process.env.REACT_APP_BACKEND_URL}/worker-auth/webGoogleLogin`,
									{
										method: 'POST',
										headers: {
											'Content-Type': 'application/json',
											Authorization: `whatever`
										},
										body: JSON.stringify({ email: email })
									}
								)
								const jwt = (await res.json()).access_token
								localStorage.setItem('token', jwt)
								history.replace('/tab/workerOrderPage')
							} else {
								history.replace('/registerSuccess')
							}
						}}></input>
				</form>
			</IonContent>
		</IonPage>
	)
}
