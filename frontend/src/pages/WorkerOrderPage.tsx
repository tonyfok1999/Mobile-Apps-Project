/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { IonContent, IonPage } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

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

	const [referenceTable, setReferenceTable] = useState<
		[
			{ id: number; region_id: number; district: string }[], //districts
			{ id: number; type: string }[], // service types
			{
				id: number
				type: string
				service_type_id: number
				subtype: string
			}[] // service subtypes
		]
	>()

	useEffect(() => {
		const fetchOrdersData = async () => {
			const res = await fetch('http://localhost:8000/orders')
			const data = await res.json()
			setOrdersInfo(data)
		}

		const fetchReferenceTable = async () => {
			const res = await fetch('http://localhost:8000/referencesTable')
			const data = await res.json()
			setReferenceTable(data)
		}

		fetchReferenceTable()
		fetchOrdersData()
	}, [])

	// referenceTable[1].filter((type) => type.id == referenceTable[2].filter((subType) => subType.id == {orderInfo.service_subtype_id})[0].service_type_id)[0].type

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
						<div className='order' key={orderInfo.id}>
							<NavLink to='/orderDetailPage'>
								<div>{orderInfo.working_address}</div>
								<div>{orderInfo.id}</div>
								<div>
									服務範圍
									<span>
										{
											referenceTable![1].filter(
												(type) =>
													type.id ==
													referenceTable![2].filter(
														(subType) =>
															subType.id ==
															orderInfo.service_subtype_id
													)[0].service_type_id
											)[0].type
										}
									</span>
								</div>
								<div>
									維修類別
									<span>
										{
											referenceTable![2].filter(
												(subType) =>
													subType.id ==
													orderInfo.service_subtype_id
											)[0].subtype
										}
									</span>
								</div>
								<div>
									預算<span>{orderInfo.budget}</span>
								</div>
								<NavLink to='/tabs/chatlist'>聯絡客戶</NavLink>
							</NavLink>
						</div>
					))}
			</IonContent>
		</IonPage>
	)
}
