/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { useState } from 'react'
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

export default function WorkerRegisterPageForTypeOfService() {
	// 0 = nothing to show
	// 1 = 風
	// 2 = 火
	// 3 = 水
	// 4 = 電
	const [showService, setShowService] = useState(0)

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
			<IonHeader>
				<IonToolbar>
					<IonTitle></IonTitle>
				</IonToolbar>
			</IonHeader>

			<form>
				<div>維修範圍*</div>
				<input
					type='radio'
					className='btn-check'
					name='serviceRage'
					id={'風'}
					// autoComplete='off'
					value={'風'}></input>
				<label
					className='btn btn-outline-danger'
					htmlFor='風'
					onClick={() => {
						setShowService(1)
					}}>
					風
				</label>

				<input
					type='radio'
					className='btn-check'
					name='serviceRage'
					id={'火'}
					// autoComplete='off'
					value={'火'}></input>
				<label
					className='btn btn-outline-danger'
					htmlFor='火'
					onClick={() => {
						setShowService(2)
					}}>
					火
				</label>

				<input
					type='radio'
					className='btn-check'
					name='serviceRage'
					id={'水'}
					// autoComplete='off'
					value={'水'}></input>
				<label
					className='btn btn-outline-danger'
					htmlFor='水'
					onClick={() => {
						setShowService(3)
					}}>
					水
				</label>

				<input
					type='radio'
					className='btn-check'
					name='serviceRage'
					id={'電'}
					// autoComplete='off'
					value={'電'}></input>
				<label
					className='btn btn-outline-danger'
					htmlFor='電'
					onClick={() => {
						setShowService(4)
					}}>
					電
				</label>
				<div>維修類別*</div>
				{showService === 1 && <div>1</div>}
				{showService === 2 && <div>2</div>}
				{showService === 3 && <div>3</div>}
				{showService === 4 && <div>4</div>}

				<input type='submit' value='註冊'></input>
			</form>
		</IonPage>
	)
}
