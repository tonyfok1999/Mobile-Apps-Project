/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { IonContent, IonPage } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
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
		const fetchOrdersData = async () => {
			const res = await fetch(`http://localhost:8000/orders/${params.id}`)
			const data = await res.json()
			setOrderInfo(data)
		}

		const fetchReferenceTable = async () => {
			const res = await fetch('http://localhost:8000/referencesTable')
			const data = await res.json()
			setReferenceTable(data)
		}

		fetchReferenceTable()
		fetchOrdersData()
	}, [])

	return (
		<IonPage>
			<IonContent>
				<div>{params.id}</div>
				<div>資料</div>
				<div>
					icon <div>地區</div>
				</div>
			</IonContent>
		</IonPage>
	)
}
