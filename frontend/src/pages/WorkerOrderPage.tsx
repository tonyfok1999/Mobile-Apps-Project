/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { IonContent, IonPage } from '@ionic/react'
import React, { useEffect, useState } from 'react'

export default function WorkerOrderPage() {
	const [ordersInfo, setOrdersInfo] = useState<
		{
			id: number
			user_id: number
			worker_id: number
			state_id: number
			service_subtype_id: number
			working_address: string
			working_date: string
			budget: number
			voice_message: string
			voice_text: string
			score_by_user: number
			score_by_worker: number
			created_at: number
			updated_at: number
		}[]
	>()

	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch('http://localhost:8000/orders')
			const fetchData = await res.json()
			setOrdersInfo(fetchData)
		}
		fetchData()
	}, [])

	return (
		<IonPage
			css={css`
				.order {
					display: flex;
					flex-direction: column;
					width: 90%;
					height: 13rem;
					justify-content: center;
					align-items: center;
					box-sizing: border-box;
					box-shadow: 0px 0px 10px #cccddd;
					border-radius: 1rem;
					padding: 0.5rem;
					margin-top: 1rem;
					margin-left: auto;
					margin-right: auto;
				}
			`}>
			<IonContent>
				{ordersInfo &&
					ordersInfo.map((orderInfo) => (
						<div className='order'>{orderInfo.id}</div>
					))}
			</IonContent>
		</IonPage>
	)
}
