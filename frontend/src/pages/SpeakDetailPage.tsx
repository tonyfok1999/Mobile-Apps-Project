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
import {
	cameraOutline,
	cashOutline,
	locationOutline,
	locationSharp,
	micOutline
} from 'ionicons/icons'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import BackIcon from '../components/BackIcon'
import RightButton from '../components/RightButton'
import { changeBudget, changeServiceType } from '../redux/speak/action'
import { RootState } from '../store'
import submit from '../srcImage/submit.png'

export default function SpeakDetailPage() {
	const dispatch = useDispatch()
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

	const [districts, setDistricts] = useState<string>('')

	const districtNumber = useSelector(
		(state: RootState) => state.speak.district
	)
	const typeNumber = useSelector(
		(state: RootState) => state.speak.serviceType
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

	useEffect(() => {
		const fetchReferenceTable = async () => {
			const res = await fetch('http://localhost:8000/referencesTable', {
				method: 'GET',
				headers: { authorization: window.localStorage.token }
			})
			const data = await res.json()
			setReferenceTable(data)
		}
		if (!referenceTable) {
			fetchReferenceTable()
		}

		if (referenceTable) {
			setDistricts(
				referenceTable[0][
					referenceTable[0].map((e) => e.id).indexOf(districtNumber)
				].district
			)
		}

		console.log(serviceSubTypeNumber)
		console.log('budget' + budget)
	}, [
		districts,
		referenceTable,
		districtNumber,
		typeNumber,
		serviceSubTypeNumber,
		budget
	])

	async function sendOder() {
		// const test = "test"
		// let datas: {
		// 	district: string
		// typeNumber: number
		// serviceSubTypeNumber: number[]
		// budget: number
		// speakFileName: string
		// transcription: string
		// } = {
		// 	district: test  ,
		// typeNumber: typeNumber,
		// serviceSubTypeNumber: serviceSubTypeNumber,
		// budget: budget,
		// speakFileName: speakFileName,
		// transcription: transcription
		// }
console.log(  window.localStorage.token);

		let testdata = await fetch(
			'http://localhost:8000/speech/submitOderFrom',
			{
				method: 'POST',
				headers: { authorization: window.localStorage.token },
				body: JSON.stringify({ district: 'test' })
			}
		)
		console.log(await testdata.json())
	}

	return (
		<IonPage
			css={css`
				* {
					/* padding: 0; */
					margin: 0;
				}
				.topBar {
					height: 4vh;
					justify-content: flex-start;
				}
				.infoBar {
					justify-content: flex-start;
					align-items: center;
					height: 8vh;
					padding-left: 5px;
				}
				.districtBar {
					height: 9vh;
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
					font-size: 4vh;
				}
				.locationIcon {
					font-size: 4.5vh;
				}
				.districtInfo {
					font-size: 3vh;
				}
				.serviceTypeBar {
					height: 14vh;
					border-bottom-style: groove;
				}
				.serviceTypeRow {
					height: 5vh;
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
					height: 1vh;
				}
				.serviceSubTypeBar {
					height: 18vh;
					border-bottom-style: groove;
				}
				.budgetBar {
					height: 12vh;
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
				.rightButtonCol {
					display: flex;
					justify-content: center;
					align-items: center;
				}
				.budgetText {
					display: flex;
					align-items: center;
					font-size: 3vh;
					padding-top: 1vh;
				}
				.imageBar {
					height: 12vh;
					border-bottom-style: groove;
				}
				.transcriptionBar {
					height: 12vh;
					border-bottom-style: groove;
				}
				button {
					padding: 0;
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
							<RightButton thisPath='/tabs/changeDistricts' />
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
															dispatch(
																changeServiceType(
																	types.id
																)
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
															dispatch(
																changeServiceType(
																	types.id
																)
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
										// .filter(
										// 	(subtypes) =>

										// 	subtypes.service_type_id === typeNumber

										// )
										.filter(
											(subtypes) =>
												serviceSubTypeNumber.includes(
													subtypes.id
												) &&
												subtypes.service_type_id ===
													typeNumber
										)

										.map((subtypes) => (
											<span key={subtypes.id}>
												<input
													type='checkbox'
													className='btn-check'
													name='serviceSubtypes'
													id={subtypes.subtype}
													value={subtypes.id}
													onChange={(e) => {}}
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
						<IonCol size='2' className='rightButtonCol'>
							<RightButton thisPath='/tabs/changeSubType' />
						</IonCol>
					</IonRow>
					<IonRow className='budgetBar'>
						<IonCol>
							<IonRow>
								<IonIcon
									className='locationIcon'
									icon={cashOutline}
								/>
								預算
							</IonRow>
							<IonRow className='budgetText'>
								$
								<input
									type='number'
									id='newBudget'
									defaultValue={budget}
									onChange={(e) => {
										console.log(e.target.value.length)
										if (
											e.target.value[0] == '0' &&
											e.target.value.length != 1
										) {
											console.log(e.target.value[0])

											let array = e.target.value.split('')
											array.shift()
											e.target.value = array.toString()
										}

										if (e.target.value != '') {
											dispatch(
												changeBudget(
													parseInt(e.target.value)
												)
											)
										} else {
											e.target.value = '0'
											dispatch(
												changeBudget(
													parseInt(e.target.value)
												)
											)
										}
									}}></input>
							</IonRow>
						</IonCol>
						<IonCol size='2' className='rightButtonCol'>
							<RightButton thisPath='' />
						</IonCol>
					</IonRow>
					<IonRow className='imageBar'>
						<IonCol>
							<IonRow>
								<IonIcon
									className='locationIcon'
									icon={cameraOutline}
								/>
								上傳照片
							</IonRow>
							<IonRow className='budgetText'>暫沒有相片</IonRow>
						</IonCol>
						<IonCol size='2' className='rightButtonCol'>
							<RightButton thisPath='' />
						</IonCol>
					</IonRow>
					<IonRow className='transcriptionBar'>
						<IonCol>
							<IonRow>
								<IonIcon
									className='locationIcon'
									icon={micOutline}
								/>
								上傳語音識別結果
							</IonRow>
							<IonRow className=''>
								<span>{transcription}</span>
							</IonRow>
						</IonCol>
					</IonRow>

					<IonRow className='submitBar'>
						<button
							onClick={() => {
								sendOder()
							}}>
							<img src={submit} alt='logo img'></img>
						</button>
					</IonRow>
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
