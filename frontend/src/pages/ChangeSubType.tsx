/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import {
	IonButton,
	IonIcon,
	IonGrid,
	IonRow,
	IonCol,
	IonPage,
	IonContent
} from '@ionic/react'
import { useEffect, useRef, useState } from 'react'
import { render } from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import BackIcon from '../components/BackIcon'
import { changeServiceSubType } from '../redux/speak/action'
import { RootState } from '../store'

export default function ChangeDistricts() {
	const history = useHistory()
	const dispatch = useDispatch()

	const [subTypeNumber, setSubTypeNumber] = useState<number[]>([])
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
	const typeNumber = useSelector(
		(state: RootState) => state.speak.serviceType
	)
	const serviceSubTypeNumber = useSelector(
		(state: RootState) => state.speak.serviceSubType
	)

	// useEffect(() => {

	// 	console.log(subTypeNumber)
	// }, [referenceTable, typeNumber, subTypeNumber, serviceSubTypeNumber])

	useEffect(() => {
		const fetchReferenceTable = async () => {
			const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/referencesTable`, {
				method: 'GET',
				headers: { authorization: window.localStorage.token }
			})
			const data = await res.json()
			setReferenceTable(data)
		}

		console.log('hi')

		fetchReferenceTable()

		setSubTypeNumber(serviceSubTypeNumber)
	}, [])

	return (
		<IonPage
			css={css`
				* {
					/* padding: 0; */
					margin: 0;
				}
				.districtsbutton {
					font-size: 3.5vh;
					height: 6vh;
				}
				.districtsBox {
					height: 70vh;
				}
				.districtsButtonCol {
					display: flex;
					justify-content: center;
					align-items: center;
				}
				.Info {
					font-size: 4vh;
				}
				.backRow {
					height: 18vh;
				}
				.back {
					display: flex;
					font-size: 4vh;
					justify-content: center;
					align-items: center;
				}
				.backText {
					font-size: bold;
					background: linear-gradient(
						45deg,
						rgb(56, 28, 129),
						rgb(254, 121, 89)
					);
					-webkit-background-clip: text;
					color: transparent;
				}
			`}>
			<IonContent>
				<IonGrid>
					<IonRow>
						<IonCol size='12'>
							<BackIcon thisPath='/Speak/SpeakDetailPage'></BackIcon>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol size='12' className='Info'>
							維修類別*
						</IonCol>
					</IonRow>
					<IonRow className='districtsBox'>
						{referenceTable &&
							referenceTable[2]
								.filter(
									(subtypes) =>
										subtypes.service_type_id == typeNumber
								)
								.map((subtypes) => {
									return(
									<IonCol key={subtypes.id}>
										<input
											type='radio'
											className='typebutton btn-check'
											name='serviceTypes'
											id={subtypes.subtype}
											value={subtypes.subtype}
											// defaultChecked
											onChange={(e) => {
												if (e.target.checked) {
													//click
													setSubTypeNumber(
														[subtypes.id])
												} else {
													// setSubTypeNumber((arr) =>
													// 	arr.filter(
													// 		(id) =>
													// 			id !=
													// 			subtypes.id
													// 	)
													// )
												}
											}}
										/>
										<label
											className='typebutton btn btn-outline-danger '
											htmlFor={subtypes.subtype}>
											{subtypes.subtype}
										</label>
									</IonCol>
									)
								})}
					</IonRow>
					<IonRow className='backRow'>
						<IonCol size='12' className='back'>
							<button
								className='backText'
								onClick={() => {
									let number = subTypeNumber
									dispatch(changeServiceSubType(number))
									console.log(serviceSubTypeNumber)
									// setSubTypeNumber([])

									history.push('/Speak/SpeakDetailPage')
								}}>
								確認並返回
							</button>
						</IonCol>
					</IonRow>
				</IonGrid>
			</IonContent>
		</IonPage>
	)
}
// <IonCol key={subtypes.id}>
// 														<input
// 															type='checkbox'
// 															className='typebutton btn-check'
// 															name='serviceTypes'
// 															id={
// 																subtypes.subtype
// 															}
// 															value={
// 																subtypes.subtype
// 															}
// 															defaultChecked
// 															onChange={(e) => {
// 																if (
// 																	e.target
// 																		.checked
// 																) {
// 																	//click
// 																	setSubTypeNumber(
// 																		(
// 																			arr
// 																		) => [
// 																			...arr,
// 																			subtypes.id
// 																		]
// 																	)
// 																} else {
// 																	setSubTypeNumber(
// 																		(arr) =>
// 																			arr.filter(
// 																				(
// 																					id
// 																				) =>
// 																					id !=
// 																					subtypes.id
// 																			)
// 																	)
// 																}
// 															}}
// 														/>
// 														<label
// 															className='typebutton btn btn-outline-danger '
// 															htmlFor={
// 																subtypes.subtype
// 															}>
// 															{subtypes.subtype}
// 														</label>
// 													</IonCol>

// return serviceSubTypeNumber.map(
//     (serviceSubTypeId) => {
//         if (
//             serviceSubTypeId == subtypes.id
//         ) {
//             return <div>1</div>
//         }
//     }
// )

// if(serviceSubTypeNumber.length==0){
// 	return (
// 		<IonCol key={subtypes.id}>
// 			<input
// 				type='checkbox'
// 				className='typebutton btn-check'
// 				name='serviceTypes'
// 				id={subtypes.subtype}
// 				value={subtypes.subtype}
// 				// defaultChecked
// 				onChange={(e) => {
// 					// console.log(e)

// 					if (
// 						e.target.checked
// 					) {
// 						//click
// 						setSubTypeNumber(
// 							(arr) => [
// 								...arr,
// 								subtypes.id
// 							]
// 						)
// 					} else {
// 						setSubTypeNumber(
// 							(arr) =>
// 								arr.filter(
// 									(
// 										id
// 									) =>
// 										id !=
// 										subtypes.id
// 								)
// 						)
// 					}
// 				}}
// 			/>
// 			<label
// 				className='typebutton btn btn-outline-danger '
// 				htmlFor={
// 					subtypes.subtype
// 				}>
// 				{subtypes.subtype}
// 			</label>
// 		</IonCol>
// 	)

// }else{
// for (const SubTypeNumbers of serviceSubTypeNumber) {
// 	// console.log(subtypes.id)

// 	// console.log(SubTypeNumbers)

// 	if (SubTypeNumbers === subtypes.id) {
// 		// console.log(SubTypeNumbers)

// 		return (
// 			<IonCol key={subtypes.id}>
// 				<input
// 					type='checkbox'
// 					className='typebutton btn-check'
// 					name='serviceTypes'
// 					id={subtypes.subtype}
// 					value={subtypes.subtype}
// 					defaultChecked
// 					onChange={(e) => {
// 						// console.log(e)

// 						if (
// 							e.target.checked
// 						) {
// 							//click
// 							setSubTypeNumber(
// 								(arr) => [
// 									...arr,
// 									subtypes.id
// 								]
// 							)
// 						} else {
// 							setSubTypeNumber(
// 								(arr) =>
// 									arr.filter(
// 										(
// 											id
// 										) =>
// 											id !=
// 											subtypes.id
// 									)
// 							)
// 						}
// 					}}
// 				/>
// 				<label
// 					className='typebutton btn btn-outline-danger '
// 					htmlFor={
// 						subtypes.subtype
// 					}>
// 					{subtypes.subtype}
// 				</label>
// 			</IonCol>
// 		)
// 	} else {
// 		return (
// 			<IonCol key={subtypes.id}>
// 				<input
// 					type='checkbox'
// 					className='typebutton btn-check'
// 					name='serviceTypes'
// 					id={subtypes.subtype}
// 					value={subtypes.subtype}

// 					onChange={(e) => {
// 						// console.log(e)
// 						if (
// 							e.target.checked
// 						) {
// 							//click
// 							setSubTypeNumber(
// 								(arr) => [
// 									...arr,
// 									subtypes.id
// 								]
// 							)
// 						} else {
// 							setSubTypeNumber(
// 								(arr) =>
// 									arr.filter(
// 										(
// 											id
// 										) =>
// 											id !=
// 											subtypes.id
// 									)
// 							)
// 						}
// 					}}
// 				/>
// 				<label
// 					className='typebutton btn btn-outline-danger '
// 					htmlFor={
// 						subtypes.subtype
// 					}>
// 					{subtypes.subtype}
// 				</label>
// 			</IonCol>
// 		)
// 	}
// }}
