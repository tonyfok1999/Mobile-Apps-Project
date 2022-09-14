/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import {
	IonButton,
	IonCol,
	IonContent,
	IonGrid,
	IonIcon,
	IonPage,
	IonRow
} from '@ionic/react'
import { locationOutline, locationSharp } from 'ionicons/icons'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import BackIcon from '../components/BackIcon'
import RightButton from '../components/RightButton'
import { RootState } from '../store'

export default function SpeakDetailPage() {
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
	const [typeNumber, setTypeNumber] = useState<number>()
	const [districts, setDistricts] = useState<string>()

	useEffect(() => {
		const fetchReferenceTable = async () => {
			const res = await fetch('http://localhost:8000/referencesTable')
			const data = await res.json()
			setReferenceTable(data)
		}
		if (!referenceTable) {
			fetchReferenceTable()
		}

		if (districtNumber && referenceTable) {
			setDistricts(
				referenceTable[0][
					referenceTable[0].map((e) => e.id).indexOf(districtNumber)
				].district
			)
		}
		if (serviceSubTypeNumber && referenceTable) {
			setTypeNumber(
				referenceTable[2][
					referenceTable[2]
						.map((e) => e.id)
						.indexOf(serviceSubTypeNumber[0])
				].service_type_id
			)
		}
	}, [districts, referenceTable])

	const districtNumber = useSelector(
		(state: RootState) => state.speak.district
	)

	const serviceSubTypeNumber = useSelector(
		(state: RootState) => state.speak.serviceSubType
	)
	const budget = useSelector((state: RootState) => state.speak.budget)
	const imageFileName = useSelector(
		(state: RootState) => state.speak.imageFileName
	)
	const speakFileName = useSelector(
		(state: RootState) => state.speak.speakFileName
	)
	const transcription = useSelector(
		(state: RootState) => state.speak.transcription
	)
	// console.log(district);

	return (
		<IonPage
			css={css`
				* {
					/* padding: 0; */
					margin: 0;
				}
				.topBar {
					height: 5vh;
					justify-content: flex-start;
				}
				.infoBar {
					justify-content: flex-start;
					align-items: center;
					height: 13vh;
					padding-left: 5px;
				}
				.districtBar {
					height: 10vh;
					border-bottom-style: groove;
				}
				.district {
					align-items: center;
					font-size: 3vh;
					height: 50%;
				}
				.districtText {
					padding-left: 11%;
				}
				h1 {
					font-weight: bolder;
					font-size: 5vh;
				}
				.locationIcon {
					font-size: 4.5vh;
				}
				.districtInfo {
					font-size: 3vh;
				}
				.serviceTypeBar {
					height: 18vh;
					border-bottom-style: groove;
				}
				.serviceTypeRow {
					height: 6vh;
				}
				.serviceSubTypeRow {
					height: 6vh;
				}
				.serviceTypeInfo {
					font-size: 3vh;
				}
				.serviceSubTypeInfo {
					font-size: 3vh;
				}
				.serviceTypeButton {
					height: 12vh;
				}
				.serviceSubTypeBar {
					height: 18vh;
					border-bottom-style: groove;
				}
				/* .typebuttonText {
					height: 55%;
					width: 90%;

					padding: 0.5rem 1.5rem;
					border-radius: 2rem;
				} */
				.typebutton {
					width: auto;
					height: auto;
				}
			`}>
			<IonContent>
				<IonGrid>
					<IonRow className='topBar'>
						<BackIcon thisPath={'/Speak/SpeakPage'} />
					</IonRow>
					<IonRow className='infoBar'>
						<h1>資料確認</h1>
					</IonRow>
					<IonRow className='districtBar'>
						<IonCol size='10'>
							<IonRow>
								<IonIcon
									className='locationIcon'
									icon={locationSharp}
								/>
								<span className='districtInfo'>地區</span>
							</IonRow>
							<IonRow className='district'>
								<span className='districtText'>
									{districts}
								</span>
							</IonRow>
						</IonCol>
						<IonCol size='2'>
							<RightButton thisPath='' />
						</IonCol>
					</IonRow>

					<IonRow className='serviceTypeBar'>
						<IonCol>
							<IonRow className='serviceTypeRow'>
								<span className='serviceTypeInfo'>
									維修範圍*
								</span>
							</IonRow>
							<IonRow className='serviceTypeButton'>
								{referenceTable &&
									referenceTable[1].map((types) => {
										if (typeNumber == types.id) {
											return (
												<IonCol key={types.id}>
													<input
														type='radio'
														className='typebutton btn-check'
														name='serviceTypes'
														id={types.type}
														value={types.type}
														defaultChecked
													/>
													<label
														className='typebutton btn btn-outline-danger '
														htmlFor={types.type}
														onClick={() => {
															setTypeNumber(
																types.id
															)
														}}>
														{types.type}
													</label>
												</IonCol>
											)
										} else {
											return (
												<IonCol key={types.id}>
													<input
														type='radio'
														className='typebutton btn-check'
														name='serviceTypes'
														id={types.type}
														value={types.type}
													/>
													<label
														className='typebutton btn btn-outline-danger '
														htmlFor={types.type}
														onClick={() => {
															setTypeNumber(
																types.id
															)
														}}>
														{types.type}
													</label>
												</IonCol>
											)
										}
									})}
							</IonRow>
						</IonCol>
					</IonRow>
					<IonRow className='serviceSubTypeBar'>
						<IonCol>
							<IonRow className='serviceSubTypeRow'>
								<span className='serviceSubTypeInfo'>
									維修類別*
								</span>
							</IonRow>
							<IonRow className='serviceTypeRow'>
							{referenceTable &&
						referenceTable[2]
							.filter(
								(subtypes) =>
									subtypes.service_type_id == typeNumber && subtypes.id == 1
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
											
										}}
									/>
									<label
										className='btn btn-outline-danger'
										htmlFor={subtypes.subtype}>
										{subtypes.subtype}
									</label>
								</span>
							))}

							</IonRow>
						</IonCol>
						<IonCol size='2'>
							<RightButton thisPath='' />
						</IonCol>
					</IonRow>
					<IonRow className='budgetBar'>
						<IonCol></IonCol>
						<IonCol></IonCol>
					</IonRow>
					<IonRow className='imageBar'>
						<IonCol></IonCol>
						<IonCol></IonCol>
					</IonRow>
					<IonRow className='transcriptionBar'></IonRow>
					<IonRow className='submitBar'></IonRow>
				</IonGrid>
			</IonContent>
		</IonPage>
	)
}

/* <div></div>
					<div>資料</div>
					<div>
						icon <div>地區</div>
						<div>{}</div>
					</div>
					<div>服務範圍</div>
					<div>{}</div>
					<div>維修類別</div>
					<div>{}</div>
					<div>icon 預算</div>
					<div>$ {}</div>
					<div>icon 相片</div>
					<div>相片</div>
					<div>icon 語音</div>
					<div>語音</div>
					<div>語音文字</div> */

// <IonCol size='3' className='typebutton wind'>
// 				<button className='typebuttonText btn btn-outline-danger'>
// 					風
// 				</button>
// 			</IonCol>
// 			<IonCol size='3' className='typebutton fire'>
// 				<button className='typebuttonText btn btn-outline-danger'>
// 					火
// 				</button>
// 			</IonCol>
// 			<IonCol size='3' className='typebutton water'>
// 				<button className='typebuttonText btn btn-outline-danger'>
// 					水
// 				</button>
// 			</IonCol>
// 			<IonCol
// 				size='3'
// 				className='typebutton electricity'>
// 				<button className='typebuttonText btn btn-outline-danger'>
// 					電
// 				</button>
// 			</IonCol>
