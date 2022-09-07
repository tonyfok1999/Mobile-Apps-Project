/** @jsxImportSource @emotion/react */

import Logo from '../components/Logo'
import { css } from '@emotion/react'
import UserTabBar from '../components/UserTabBar'
import {
	IonButton,
	IonIcon,
	IonGrid,
	IonRow,
	IonCol,
	IonPage
} from '@ionic/react'
import DetailsOfRecordingContent from '../components/DetailsOfRecordingContent'
import { micOutline } from 'ionicons/icons'
import TopBar from '../components/TopBar'
import { useEffect, useState } from 'react'
export default function SpeakPage() {
	const [recordState, setRecordState] = useState<boolean>(false)

	// useEffect(() => {
	// 	if(recordState){

	// 	}

	// 	},[recordState]);

	return (
		<IonPage
			css={css`
				img {
					width: 60%;
				}
				.center {
					display: flex;
					justify-content: center;
					align-items: center;
				}
				.topBar {
					height: 10vh;
				}
				.logoCol {
					height: 30vh;
				}
				.infoCol {
					height: 30vh;
				}
				.DetailsOfRecordingContent {
					font-size: x-large;
				}
				.buttonRow {
					padding: 0;
					height: 30vh;
				}
				.textButton {
					display: flex;
					justify-content: center;
					align-items: flex-end;
				}

				.iconButton {
					display: flex;
					justify-content: center;
					align-items: flex-start;
				}

				* {
					padding: 0;
					margin: 0;
				}
			`}>
			<IonGrid>
				<IonRow className='topBar'>
					<IonCol className='topBar'>
						<TopBar />
					</IonCol>
				</IonRow>
				<IonRow className='logoCol'>
					<IonCol className='center'>
						<Logo />
					</IonCol>
				</IonRow>
				<IonRow className='infoCol'>
					<IonCol className='center DetailsOfRecordingContent'>
						<DetailsOfRecordingContent />
					</IonCol>
				</IonRow>

				<IonRow className='buttonRow '>
					{recordState ? (
						<IonButton
						
						size='large'
						fill='clear'
						// routerLink='/SpeakTest'
						onClick={() => {
							setRecordState(false)
						}}>
						<h3>聆聽中,按一下結束</h3>
					</IonButton>
					
					) : (
						<>
							<IonCol class='textButton' size='12'>
								<IonButton
									size='large'
									fill='clear'
									// routerLink='/SpeakTest'
									onClick={() => {
										setRecordState(true)
									}}>
									<h3>按一下開始說話</h3>
								</IonButton>
							</IonCol>
							<IonCol class='iconButton' size='12'>
								<IonButton
									size='large'
									fill='clear'
									// routerLink='/SpeakTest'
									onClick={() => {
										setRecordState(true)
									}}>
									<IonIcon
										className='mic icon'
										icon={micOutline}
									/>
								</IonButton>
							</IonCol>
						</>
					)}
				</IonRow>
			</IonGrid>
		</IonPage>
	)
}
