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
    const history = useHistory();
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
			const res = await fetch('http://localhost:8000/referencesTable')
			const data = await res.json()
			setReferenceTable(data)
		}

        if (!referenceTable) {
            fetchReferenceTable()          
        }


	}, [referenceTable,districtNumber])


	return (
		<IonPage
			css={css`
				* {
					/* padding: 0; */
					margin: 0;
				}
                .districtsbutton{
                    font-size: 3.5vh;
                    height: 6vh;
                }
                .districtsBox{
                    height: 70vh;

                }
                .districtsButtonCol{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    
                }
                .Info{
                    font-size: 4vh;
                }
                .backRow{
                    height: 18vh;
                    
                }
                .back{
                    display: flex;
                    font-size: 4vh;
                    justify-content: center;
                    align-items: center;
                    
                }
                .backText{
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
						<IonCol size='12' className='Info'>地區</IonCol>
					</IonRow>
					<IonRow className='districtsBox'>
						{referenceTable &&
							referenceTable[0].map((districts) => {
								if (districts.id == districtNumber) {
									return (
										<IonCol key={districts.id} size='4' className='districtsButtonCol'>
											<input
												type='radio'
												className='districtsbutton btn-check'
												name='districts'
												id={districts.district }
												value={districts.district }
												defaultChecked
											/>
											<label
												className='districtsbutton btn btn-outline-danger '
												htmlFor={districts.district}
												onClick={() => {
													dispatch(changeDistrict(districts.id))
												}}>
												{districts.district}
											</label>
										</IonCol>
									)
								} else {
									return (
										<IonCol key={districts.id} size='4' className='districtsButtonCol'>
											<input
												type='radio'
												className='districtsbutton btn-check'
												name='districts'
												id={districts.district }
												value={districts.district }
												
											/>
											<label
												className='districtsbutton btn btn-outline-danger '
												htmlFor={districts.district}
												onClick={() => {
													dispatch(changeDistrict(districts.id))
                                                    
                                                    
												}}>
												{districts.district}
											</label>
										</IonCol>
									)
								}
							})}
					</IonRow>
					<IonRow className='backRow'><IonCol size='12'  className='back'><button className='backText' onClick={()=>{history.push("/Speak/SpeakDetailPage");}}>確認並返回</button></IonCol></IonRow>
				</IonGrid>
			</IonContent>
		</IonPage>
	)
}


