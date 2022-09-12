/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { IonContent, IonPage } from '@ionic/react'
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
			const res = await fetch(`http://localhost:8000/orders/${params.id}`)
			const data = await res.json()
			setOrderInfo(data[0])
		}

		const fetchReferenceTable = async () => {
			const res = await fetch('http://localhost:8000/referencesTable')
			const data = await res.json()
			setReferenceTable(data)
		}

		fetchOrderData()
		fetchReferenceTable()
	}, [])

	return (
		<IonPage css={css``}>
			<IonContent>
				<div>{orderInfo?.id}</div>
				<div>資料</div>
				<div>
					icon <div>地區</div>
					<div>{orderInfo?.working_address}</div>
				</div>
				<div>服務範圍</div>
				<div>
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
				<div>維修類別</div>
				<div>
					{referenceTable &&
						referenceTable[2].filter(
							(subType) =>
								subType.id == orderInfo?.service_subtype_id
						)[0].subtype}
				</div>
				<div>icon 預算</div>
				<div>$ {orderInfo?.budget}</div>
				<div>icon 相片</div>
				<div>相片</div>
				<div>icon 語音</div>
				<div>語音</div>
				<div>語音文字</div>
			</IonContent>
		</IonPage>
	)
}
