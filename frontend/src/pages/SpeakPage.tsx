/** @jsxImportSource @emotion/react */

import Logo from '../components/Logo'
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
import DetailsOfRecordingContent from '../components/DetailsOfRecordingContent'
import { micOutline } from 'ionicons/icons'
import TopBar from '../components/TopBar'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
	changeDistrict,
	changeServiceSubType,
	changeSpeakFileName,
	changeTranscription
} from '../redux/speak/action'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
export default function SpeakPage() {
	const dispatch = useDispatch()
	const [recordState, setRecordState] = useState<boolean>(false)
	const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>()

	const newMediaDevices = async () => {
		await navigator.mediaDevices
			.getUserMedia({ audio: true })
			.then((stream) => {
				setMediaRecorder(new MediaRecorder(stream))

				// console.log('getUserMedia supported.')
			})
	}

	const closeMediaDevices = async () => {
		await navigator.mediaDevices
			.getUserMedia({ audio: true })
			.then((stream) => {
				var track = stream.getTracks()[0]
				track.stop()
			})
	}

	useEffect(() => {
		// console.log(mediaRecorder?.state)
		let chunks: any[] = []
		if (mediaRecorder?.state === 'inactive' && recordState === true) {
			mediaRecorder.start()
			// console.log(mediaRecorder.state)
		}

		if (mediaRecorder?.state === 'recording' && recordState === false) {
			mediaRecorder.ondataavailable = async function (e) {
				chunks.push(e.data)
				// console.log(mediaRecorder.state)

				const formData = new FormData()

				const blob = new Blob(chunks, {
					type: 'audio/WebM; codecs=opus'
				})
				// console.log(blob)
				formData.append('record', blob)
				// console.log(formData)

				let data = await fetch(
					'http://localhost:8000/speech/uploadWebM',
					{
						method: 'POST',
						body: formData
					}
				)
				let datas = await data.json()
				console.log(datas) ///speech data by backend
				dispatch(changeDistrict(datas.district))
				dispatch(changeServiceSubType(datas.serviceSubType))
				dispatch(changeSpeakFileName(datas.speakFileName))
				dispatch(changeTranscription(datas.transcription))
			}
			mediaRecorder.stop()
			// console.log(mediaRecorder.state)
			chunks = []
		}
	}, [recordState, mediaRecorder])

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
				.endRecordingButton {
					display: flex;
					justify-content: center;
					align-items: center;
				}

				* {
					padding: 0;
					margin: 0;
				}
			`}>
			<IonContent>
				<IonGrid>
					<IonRow className='topBar'>
						<IonCol className='topBar'>
							<TopBar thisBackPath={'/tabs/homepage'}/>
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
							<>
								<IonCol></IonCol>
								<IonCol class='endRecordingButton' size='12'>
									<IonButton
										size='large'
										fill='clear'
										onClick={() => {
											setRecordState(false)
											closeMediaDevices()
										}}
										routerLink='/Speak/SpeakDetailPage'>
										<h3>聆聽中,按一下結束 </h3>
									</IonButton>
								</IonCol>
							</>
						) : (
							<>
								<IonCol class='textButton' size='12'>
									<IonButton
										size='large'
										fill='clear'
										onClick={() => {
											setRecordState(true)
											newMediaDevices()
										}}>
										<h3>按一下開始說話 </h3>
									</IonButton>
								</IonCol>
								<IonCol class='iconButton' size='12'>
									<IonButton
										size='large'
										fill='clear'
										onClick={() => {
											setRecordState(true)
											newMediaDevices()
										}}>
										<IonIcon
											className='micicon'
											icon={micOutline}
										/>
									</IonButton>
								</IonCol>
							</>
						)}
					</IonRow>
				</IonGrid>
			</IonContent>
		</IonPage>
	)
}
