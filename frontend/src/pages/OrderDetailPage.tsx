/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { OverlayEventDetail } from '@ionic/core'
import {
	IonButton,
	IonButtons,
	IonContent,
	IonHeader,
	IonIcon,
	IonModal,
	IonPage,
	IonTitle,
	IonToolbar
} from '@ionic/react'
import {
	arrowBackOutline,
	cameraOutline,
	cashOutline,
	chevronForwardOutline,
	locationSharp,
	micOutline
} from 'ionicons/icons'
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, EffectFade } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

export default function OrderDetailPage() {
	const params = useParams<{ id: string }>()

	const [orderInfo, setOrderInfo] = useState<{
		orderInfo: {
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
		}

		orderImagesName: { image_name: string }[]
	} | null>()

	const [referenceTable, setReferenceTable] = useState<
		[
			{ id: number; region_id: number; district: string }[], //districts
			{ id: number; type: string }[], // service types
			{
				id: number
				service_type_id: number
				subtype: string
			}[] // service subtypes
		]
	>()

	useEffect(() => {
		const fetchOrderData = async () => {
			const res = await fetch(
				`${process.env.REACT_APP_BACKEND_URL}/orders/${params.id}`,
				{
					headers: { Authorization: `whatever` }
				}
			)
			const data = await res.json()
			setOrderInfo(data)
		}

		const fetchReferenceTable = async () => {
			const res = await fetch(
				`${process.env.REACT_APP_BACKEND_URL}/referencesTable`,
				{
					headers: { Authorization: `whatever` }
				}
			)
			const data = await res.json()
			setReferenceTable(data)
		}

		fetchReferenceTable()
		fetchOrderData()

		return () => {
			setOrderInfo(null)
		}
	}, [params.id])

	const modal = useRef<HTMLIonModalElement>(null)

	return (
		<IonPage>
			<IonContent
				css={css`
					.line {
						width: 90%;
						border-bottom: solid #dfe0e5 1px;
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
					img {
						margin-left: 1rem;
						min-height: 5rem;
						max-height: 5rem;
						min-width: 5rem;
						max-width: 5rem;
					}
				`}>
				<div className='id'>
					<IonButton
						size='large'
						fill='clear'
						routerLink='/tab/workerOrderPage'>
						<IonIcon className='icon' icon={arrowBackOutline} />
					</IonButton>
					<div>{orderInfo?.orderInfo.id}</div>
				</div>
				<h1>資料</h1>
				<div className='address'>
					<IonIcon className='icon' icon={locationSharp} />
					<div>
						<div>地區</div>
						<div>{orderInfo?.orderInfo.working_address}</div>
					</div>
				</div>
				<div className='line'></div>
				<h4>服務範圍</h4>
				<div className='service btn btn-outline-danger'>
					{referenceTable &&
						orderInfo &&
						referenceTable[1].filter(
							(type) =>
								type.id ==
								referenceTable[2].filter(
									(subType) =>
										subType.id ==
										orderInfo?.orderInfo.service_subtype_id
								)[0].service_type_id
						)[0]?.type}
				</div>
				<div className='line'></div>
				<h4>維修類別</h4>
				<div className='service btn btn-outline-danger'>
					{referenceTable &&
						orderInfo &&
						referenceTable[2].filter(
							(subType) =>
								subType.id ==
								orderInfo?.orderInfo.service_subtype_id
						)[0]?.subtype}
				</div>
				<div className='line'></div>
				<div>
					<IonIcon className='icon' icon={cashOutline} /> 預算
					<div>$ {orderInfo?.orderInfo.budget}</div>
				</div>
				<div className='line'></div>
				<div>
					<IonIcon className='icon' icon={cameraOutline} />
					相片
					<div>
						{orderInfo && orderInfo.orderImagesName.length == 0
							? '沒有相片'
							: orderInfo?.orderImagesName.map((item, i) => (
									<img
										key={i}
										src={
											process.env.REACT_APP_BACKEND_URL +
											'/' +
											item.image_name
										}
									/>
							  ))}

						<IonButton id='open-modal2' size='small' fill='clear'>
							<IonIcon
								className='icon'
								icon={chevronForwardOutline}
							/>
						</IonButton>
					</div>
					<IonModal ref={modal} trigger='open-modal2'>
						<IonHeader>
							<IonToolbar>
								<IonButtons slot='start'>
									<IonButton
										onClick={() =>
											modal.current?.dismiss()
										}>
										返回
									</IonButton>
								</IonButtons>
								<IonTitle>相片</IonTitle>
							</IonToolbar>
						</IonHeader>
						<IonContent>
							<Swiper
								modules={[Navigation]}
								navigation
								slidesPerView={1}
								css={css`
									height: 100%;
									display: flex;
									justify-content: center;
									align-items: center;
								`}>
								{orderInfo &&
									orderInfo.orderImagesName.map((item, i) => (
										<SwiperSlide key={i}>
											<img
												css={css`
													display: block;
													margin-left: auto;
													margin-right: auto;
													margin-top: 5%;
													min-width: 95%;
													max-width: 95%;
													min-height: 90%;
													max-height: 90%;
												`}
												src={
													process.env
														.REACT_APP_BACKEND_URL +
													'/' +
													item.image_name
												}
											/>
										</SwiperSlide>
									))}
							</Swiper>
						</IonContent>
					</IonModal>
				</div>
				<div className='line'></div>
				<div>
					<IonIcon className='icon' icon={micOutline} /> 錄音
					<div>
						{orderInfo &&
						orderInfo.orderInfo.voice_message != null ? (
							<audio
								controls
								className='playaudio'
								controlsList='nodownload'
								preload='metadata'
								src={
									process.env.REACT_APP_BACKEND_URL +
									'/' +
									orderInfo?.orderInfo.voice_message
								}
							/>
						) : (
							'沒有錄音'
						)}
					</div>
				</div>
				<div>{orderInfo?.orderInfo.voice_text}</div>
			</IonContent>
		</IonPage>
	)
}
