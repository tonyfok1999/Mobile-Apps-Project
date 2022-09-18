/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { IonButton, IonContent, IonIcon, IonPage } from '@ionic/react'
import {
	arrowBackOutline,
	cameraOutline,
	cashOutline,
	locationSharp,
	micOutline
} from 'ionicons/icons'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function OrderDetailPage() {
	const params = useParams<{ id: string }>()

	const [orderInfo, setOrderInfo] = useState<{
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
	}>()

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
		const fetchOrderData = async () => {
			const res = await fetch(
				`http://localhost:8000/orders/${params.id}`,
				{
					headers: { Authorization: `whatever` }
				}
			)
			const data = await res.json()
			setOrderInfo(data[0])
		}

		const fetchReferenceTable = async () => {
			const res = await fetch('http://localhost:8000/referencesTable', {
				headers: { Authorization: `whatever` }
			})
			const data = await res.json()
			setReferenceTable(data)
		}

		fetchOrderData()
		fetchReferenceTable()
	}, [])

	return (
		<IonPage>
			<IonContent
				css={css`
					.line {
						width: 90%;
						border-bottom: solid #dfe0e5;
						margin-top: 0.5rem;
						margin-bottom: 0.8rem;
					}
					div {
						margin-left: 1rem;
					}
					.id {
						display: flex;
						div {
							width: 70%;
							display: flex;
							justify-content: center;
							align-items: center;
						}
					}
					h1 {
						font-weight: bold;
					}
					.address {
						display: flex;
						width: 90%;

						div {
							display: block;
						}
					}
					h4 {
						font-weight: bold;
					}
					.service {
						border-color: #fa7268;
						background-color: #fa7268;
						color: white;
						padding: 2px;
						border-radius: 1rem;
						min-width: 3rem;
					}
				`}>
				<div className='id'>
					<IonButton
						size='large'
						fill='clear'
						routerLink='/workerOrderPage'>
						<IonIcon className='icon' icon={arrowBackOutline} />
					</IonButton>
					<div>{orderInfo?.id}</div>
				</div>
				<h1>資料</h1>
				<div className='address'>
					<IonIcon className='icon' icon={locationSharp} />
					<div>
						<div>地區</div>
						<div>{orderInfo?.working_address}</div>
					</div>
				</div>
				<div className='line'></div>
				<h4>服務範圍</h4>
				<div className='service btn btn-outline-danger'>
					{referenceTable &&
						referenceTable[1].filter(
							(type) =>
								type.id ==
								referenceTable[2].filter(
									(subType) =>
										subType.id ==
										orderInfo?.service_subtype_id
								)[0].service_type_id
						)[0].type}
				</div>
				<div className='line'></div>
				<h4>維修類別</h4>
				<div className='service btn btn-outline-danger'>
					{referenceTable &&
						referenceTable[2].filter(
							(subType) =>
								subType.id == orderInfo?.service_subtype_id
						)[0].subtype}
				</div>
				<div className='line'></div>
				<div>
					<IonIcon className='icon' icon={cashOutline} /> 預算
					<div>$ {orderInfo?.budget}</div>
				</div>
				<div className='line'></div>
				<div>
					<IonIcon className='icon' icon={cameraOutline} />
					相片
					<div>相片</div>
				</div>
				<div className='line'></div>
				<div>
					<IonIcon className='icon' icon={micOutline} /> 語音
					<div>語音</div>
				</div>
				<div>語音文字</div>
			</IonContent>
		</IonPage>
	)
}
