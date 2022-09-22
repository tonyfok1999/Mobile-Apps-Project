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
import { Icon } from 'ionicons/dist/types/components/icon/icon'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { types } from 'util'
import BackIcon from '../components/BackIcon'
import { changeDistrict, changeServiceType } from '../redux/speak/action'
import { RootState } from '../store'

export default function ChangeDistricts() {
	const history = useHistory()
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
	const districtNumber = useSelector(
		(state: RootState) => state.speak.district
	)

	useEffect(() => {
		const fetchReferenceTable = async () => {
			const res = await fetch(
				`${process.env.REACT_APP_BACKEND_URL}/referencesTable`,
				{
					method: 'GET',
					headers: { authorization: window.localStorage.token }
				}
			)
			const data = await res.json()
			setReferenceTable(data)
		}

		if (!referenceTable) {
			fetchReferenceTable()
		}
	}, [referenceTable, districtNumber])

	return (
		<IonPage
			css={css`
				* {
					/* padding: 0; */
					margin: 0;
				}
				.districtsbutton {
					/* overflow: hidden; */
					/* font-size: 3.5vh; */
					height: 6vh;
					min-width: 6rem;
					max-width: 6rem;
					padding: 6px;
				}
				.districtsBox {
					/* height: 70vh; */
				}
				.districtsButtonCol {
					padding: 5 2 5 2;
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
					display: block;
					font-size: bold;
					background: linear-gradient(
						45deg,
						rgb(56, 28, 129),
						rgb(254, 121, 89)
					);
					-webkit-background-clip: text;
					color: transparent;
				}
				.districtText {
					display: flex;
					/* justify-content: center; */

					/* padding: 0 5 0 10; */
					align-items: center;
				}
				h2 {
					padding: 0 5 0 10;
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
							地區
						</IonCol>
					</IonRow>
					<IonRow className='districtTextRow'>
						<IonCol size='12' className='districtText'>
							<h2>香港</h2>
						</IonCol>
					</IonRow>
					<IonRow className='districtsBox'>
						{referenceTable &&
							referenceTable[0].map((districts) => {
								if (
									districts.id == districtNumber &&
									districts.region_id == 1
								) {
									return (
										<IonCol
											key={districts.id}
											size='4'
											className='districtsButtonCol'>
											<input
												type='radio'
												className='districtsbutton btn-check'
												name='districts'
												id={districts.district}
												value={districts.district}
												defaultChecked
											/>
											<label
												className='districtsbutton btn btn-outline-danger '
												htmlFor={districts.district}
												onClick={() => {
													dispatch(
														changeDistrict(
															districts.id
														)
													)
												}}>
												{districts.district}
											</label>
										</IonCol>
									)
								} else if (districts.region_id == 1) {
									return (
										<IonCol
											key={districts.id}
											size='4'
											className='districtsButtonCol'>
											<input
												type='radio'
												className='districtsbutton btn-check'
												name='districts'
												id={districts.district}
												value={districts.district}
											/>
											<label
												className='districtsbutton btn btn-outline-danger '
												htmlFor={districts.district}
												onClick={() => {
													dispatch(
														changeDistrict(
															districts.id
														)
													)
												}}>
												{districts.district}
											</label>
										</IonCol>
									)
								}
							})}
					</IonRow>
					<IonRow className='districtTextRow'>
						<IonCol size='12' className='districtText'>
							<h2>九龍</h2>
						</IonCol>
					</IonRow>

					<IonRow className='districtsBox'>
						{referenceTable &&
							referenceTable[0].map((districts) => {
								if (
									districts.id == districtNumber &&
									districts.region_id == 2
								) {
									return (
										<IonCol
											key={districts.id}
											size='4'
											className='districtsButtonCol'>
											<input
												type='radio'
												className='districtsbutton btn-check'
												name='districts'
												id={districts.district}
												value={districts.district}
												defaultChecked
											/>
											<label
												className='districtsbutton btn btn-outline-danger '
												htmlFor={districts.district}
												onClick={() => {
													dispatch(
														changeDistrict(
															districts.id
														)
													)
												}}>
												{districts.district}
											</label>
										</IonCol>
									)
								} else if (districts.region_id == 2) {
									return (
										<IonCol
											key={districts.id}
											size='4'
											className='districtsButtonCol'>
											<input
												type='radio'
												className='districtsbutton btn-check'
												name='districts'
												id={districts.district}
												value={districts.district}
											/>
											<label
												className='districtsbutton btn btn-outline-danger '
												htmlFor={districts.district}
												onClick={() => {
													dispatch(
														changeDistrict(
															districts.id
														)
													)
												}}>
												{districts.district}
											</label>
										</IonCol>
									)
								}
							})}
					</IonRow>
					<IonRow className='districtTextRow'>
						<IonCol size='12' className='districtText'>
							<h2>新界</h2>
						</IonCol>
					</IonRow>
					<IonRow className='districtsBox'>
						{referenceTable &&
							referenceTable[0].map((districts) => {
								if (
									districts.id == districtNumber &&
									districts.region_id == 3
								) {
									return (
										<IonCol
											key={districts.id}
											size='4'
											className='districtsButtonCol'>
											<input
												type='radio'
												className='districtsbutton btn-check'
												name='districts'
												id={districts.district}
												value={districts.district}
												defaultChecked
											/>
											<label
												className='districtsbutton btn btn-outline-danger '
												htmlFor={districts.district}
												onClick={() => {
													dispatch(
														changeDistrict(
															districts.id
														)
													)
												}}>
												{districts.district}
											</label>
										</IonCol>
									)
								} else if (districts.region_id == 3) {
									return (
										<IonCol
											key={districts.id}
											size='4'
											className='districtsButtonCol'>
											<input
												type='radio'
												className='districtsbutton btn-check'
												name='districts'
												id={districts.district}
												value={districts.district}
											/>
											<label
												className='districtsbutton btn btn-outline-danger '
												htmlFor={districts.district}
												onClick={() => {
													dispatch(
														changeDistrict(
															districts.id
														)
													)
												}}>
												{districts.district}
											</label>
										</IonCol>
									)
								}
							})}
					</IonRow>
					<IonRow className='backRow'>
						<IonCol size='12' className='back'>
							<button
								className='backText'
								onClick={() => {
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
