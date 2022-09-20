/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { IonButton, IonContent, IonPage, useIonAlert } from '@ionic/react'
import { construct } from 'ionicons/icons'
import React, { useContext, useEffect, useInsertionEffect, useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { WebSocketContext } from '../context/WebScoketContext'
import WorkerTabBar from '../nav/WorkerTabBar'
import { useAppSelector } from '../store'

export default function WorkerOrderPage() {
	const token = localStorage.getItem('token')
	const workerId = useAppSelector((state) => state.auth.user!.id)
	const socket = useContext(WebSocketContext)
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
			const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/orders`, {
				headers: { Authorization: `whatever` }
			})
			const data = await res.json()
			setOrdersInfo(data)
		}

		const fetchReferenceTable = async () => {
			const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/referencesTable`, {
				headers: { Authorization: `whatever` }
			})
			const data = await res.json()
			setReferenceTable(data)
		}

		fetchReferenceTable()
		fetchOrdersData()
	}, [])

	const history = useHistory()

	return (
		<IonPage>
			<IonContent
				css={css`
					.order {
						display: flex;
						flex-direction: column;
						width: 90%;
						height: 43%;
						justify-content: center;
						align-items: center;
						box-sizing: border-box;
						box-shadow: 0px 0px 10px #cccddd;
						border-radius: 1rem;
						padding: 0.5rem;
						margin-top: 1rem;
						margin-left: auto;
						margin-right: auto;
						div {
							margin-bottom: 0.8rem;
						}
					}
					a {
						text-decoration: none;
					}
					.address {
						font-weight: bold;
						color: black;
						margin-bottom: 0 !important;
					}
					.orderId {
						width: 100%;
						display: flex;
						justify-content: center;
						border-bottom: solid #cccddd;
					}
					.service {
						display: flex;
						width: 100%;
						justify-content: space-between;
						span {
							color: #fa7268;
						}
					}
					.type {
						display: flex;
						width: 100%;
						justify-content: space-between;
						span {
							border-color: #fa7268;
							background-color: #fa7268;
							color: white;
							padding: 2px;
							border-radius: 1rem;
							min-width: 3rem;
						}
					}
					.budget {
						display: flex;
						width: 100%;
						justify-content: space-between;
						span {
							color: black;
						}
					}

					button {
						width: 13rem;
						background-color: #7ed321;
						color: white;
						padding: 0.7rem;
						border-radius: 3rem;
					}
				`}>
				{ordersInfo &&
					ordersInfo.map((orderInfo) => (
						<div>
							<NavLink
								key={orderInfo.id}
								to={`/orderDetailPage/${orderInfo.id}`}>
								<div className='order'>
									<div className='address'>
										{orderInfo.working_address}
									</div>
									<div className='orderId'>
										{orderInfo.id}
									</div>
									<div className='service'>
										服務範圍
										<span>
											{referenceTable &&
												referenceTable[1].filter(
													(type) =>
														type.id ==
														referenceTable![2].filter(
															(subType) =>
																subType.id ==
																orderInfo.service_subtype_id
														)[0].service_type_id
												)[0].type}
										</span>
									</div>
									<div className='type'>
										維修類別
										<span className='btn btn-outline-danger'>
											{referenceTable &&
												referenceTable[2].filter(
													(subType) =>
														subType.id ==
														orderInfo.service_subtype_id
												)[0].subtype}
										</span>
									</div>
									<div className='budget'>
										預算<span>${orderInfo.budget}</span>
									</div>
								</div>
							</NavLink>

							<button
								onClick={() => {
									// pass in the id of user (not worker) who submit the order

									;(async () => {
										const res = await fetch(
											`${process.env.REACT_APP_BACKEND_URL}/chatroom/orderChatroom?orderId=${orderInfo.id}&userId=${orderInfo.user_id}&workerId=${workerId}`,
											{
												method: 'POST',
												headers: {
													Authorization: `Bearer ${token}`
												}
											}
										)


										const chatroomId = await res.json()
										console.log({ chatroomId: chatroomId })
										history.replace(`/chatroom/${chatroomId.chatroomId}`)

										socket.emit('createChatroom', chatroomId)
									})()
									
									//
								}}>
								聯絡客戶
							</button>
						</div>
					))}
			</IonContent>
			<WorkerTabBar />
		</IonPage>
	)
}
