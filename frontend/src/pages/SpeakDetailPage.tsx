/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import {
	IonButton,
	IonButtons,
	IonCol,
	IonContent,
	IonGrid,
	IonHeader,
	IonIcon,
	IonInput,
	IonItem,
	IonLabel,
	IonModal,
	IonPage,
	IonRow,
	IonTitle,
	IonToolbar,
	useIonAlert
} from '@ionic/react'
import {
	cameraOutline,
	cashOutline,
	chevronForwardOutline,
	closeCircleOutline,
	locationOutline,
	locationSharp,
	micOutline
} from 'ionicons/icons'
import React, { SetStateAction, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import BackIcon from '../components/BackIcon'
import RightButton from '../components/RightButton'
import { changeBudget, changeServiceType } from '../redux/speak/action'
import { RootState, useAppSelector } from '../store'
import submit from '../srcImage/submit.png'
import {
	Camera,
	CameraResultType,
	CameraSource,
	GalleryPhoto
} from '@capacitor/camera'
import { stringify, v4 as uuidv4 } from 'uuid'
import { OverlayEventDetail } from '@ionic/core'
export default function SpeakDetailPage() {
	const history = useHistory()
	const [presentAlert] = useIonAlert()
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
	const [images, setimages] = useState<GalleryPhoto[]>([])
	const [districts, setDistricts] = useState<string>('')
	const [count, setCount] = useState<Number>(0)

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
	const speakUrl = useSelector((state: RootState) => state.speak.speakURL)

	const user = useAppSelector((state) => state.auth.user!.id)
	const modal = useRef<HTMLIonModalElement>(null)
	const input = useRef<HTMLIonInputElement>(null)
	useEffect(() => {
		console.log('start of detailPage')

		const fetchReferenceTable = async () => {
			const res = await fetch(
				`${process.env.REACT_APP_BACKEND_URL}/referencesTable`,
				{
					method: 'GET',
					headers: { authorization: window.localStorage.token }
				}
			)
			const data = await res.json()
			console.log(data)

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
	}, [
		districts,
		referenceTable,
		districtNumber,
		typeNumber,
		serviceSubTypeNumber,
		budget,
		images
	])
	useEffect(() => {
		if (referenceTable && count == 0) {
			dispatch(
				changeServiceType(
					referenceTable[2][
						referenceTable[0]
							.map((e) => e.id)
							.indexOf(serviceSubTypeNumber[0])
					].service_type_id
				)
			)
			console.log(typeNumber)

			setCount(1)
		}
	}, [referenceTable, count])

	async function sendOder() {
		let datas: {
			district: string
			typeNumber: number
			serviceSubTypeNumber: number[]
			budget: number
			speakFileName: string
			transcription: string
		} = {
			district: districts,
			typeNumber: typeNumber,
			serviceSubTypeNumber: serviceSubTypeNumber,
			budget: budget,
			speakFileName: speakFileName,
			transcription: transcription
		}
		let sendDataToBackend = await fetch(
			`${process.env.REACT_APP_BACKEND_URL}/speech/submitOderFrom`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					authorization: window.localStorage.token,
					userId: user as any
				},
				body: JSON.stringify(datas)
			}
		)
		let oderId = await sendDataToBackend.json()
		// console.log(oderId.oderID[0].id);

		if (images.length > 0 && oderId.oderID[0].id) {
			const formData = new FormData()
			for (let img of images) {
				let blob = await fetch(img.webPath).then((r) => r.blob())
				// console.log(blob)
				formData.append('oderImage', blob)
			}
			console.log(formData.getAll('oderImage'))
			let uploadOderImage = await fetch(
				`${process.env.REACT_APP_BACKEND_URL}/speech/uploadOderImage`,
				{
					method: 'POST',
					headers: {
						authorization: window.localStorage.token,
						oderId: oderId.oderID[0].id
					},
					body: formData
				}
			)
			console.log(oderId.oderID[0].id)

			console.log(await uploadOderImage.json())
			setimages([])
			setDistricts('')
			presentAlert({
				
				header: '通知：',
				subHeader:
					'資料上傳成功',
				message: '現返回首頁!',
				buttons: ['OK']
			})
			history.push('/')
			
		}
	}
	function confirm() {
		modal.current?.dismiss(input.current?.value, 'confirm')
	}
	function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
		if (ev.detail.role === 'confirm') {
		}
	}
	return (
		<IonPage
			css={css`
				* {
					/* padding: 0; */
					margin: 0;
				}
				.topBar {
					/* height: 4vh; */
					justify-content: flex-start;
				}
				.infoBar {
					justify-content: flex-start;
					align-items: center;
					/* height: 8vh; */
					padding-left: 5px;
				}
				.districtBar {
					/* height: 10vh; */
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
				.imageIcon {
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
					/* height: 5vh; */
				}
				.serviceSubTypeRow {
					/* height: 6vh; */
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
					/* height: 14vh; */
					border-bottom-style: groove;
				}
				.budgetBar {
					/* height: 16vh; */
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
					/* height: 13vh; */
					border-bottom-style: groove;
				}
				.transcriptionBar {
					/* height: 12vh; */
					border-bottom-style: groove;
				}
				button {
					padding: 0;
				}
				.budgetText {
					border-right: 10px;
					padding: 0;
					font-size: 3vh;
				}
				.budgetInputIconText {
					align-items: center;
					font-size: 2.9vh;
				}
				.newBudgetNumber {
					/* line-height: 5vh, */
					font-size: 2.8vh;
				}
				.imageText {
					/* height: 6vh; */

					/* max-height:9vh ; */
				}
				.inputImage {
					height: 6vh;
				}
				.imageInfoText {
					font-size: 3vh;
				}
				.audioBox {
					/* height:6vh; */
					display: flex;
					align-items: center;
					justify-content: center;
				}
				.audioInfo {
					font-size: 3vh;
				}
				.playaudio {
					padding: 2 0 2 0;
				}
				.audioBox {
					height: 9vh;
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
										return (
											<IonCol key={types.id}>
												<input
													type='radio'
													className='typebutton btn-check'
													name='serviceTypes'
													id={types.type}
													value={types.type}
													defaultChecked={typeNumber == types.id}
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
								<IonCol size='2'>
									<IonIcon
										className='locationIcon'
										icon={cashOutline}
									/>
								</IonCol>
								<IonCol>
									<span className='budgetText'>預算</span>
								</IonCol>
							</IonRow>
							<IonRow>
								<IonCol
									size='1'
									className='budgetInputIconText'>
									$
								</IonCol>
								<IonCol className='newBudgetNumber'>
									<input
										type='number'
										id='newBudget'
										defaultValue={budget}
										onChange={(e) => {
											// console.log(e.target.value.length)
											if (
												e.target.value[0] == '0' &&
												e.target.value.length != 1
											) {
												// console.log(e.target.value[0])

												let array =
													e.target.value.split('')
												array.shift()
												e.target.value =
													array.toString()
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
								</IonCol>
							</IonRow>
						</IonCol>
						<IonCol size='2' className='rightButtonCol'></IonCol>
					</IonRow>
					<IonRow className='imageBar'>
						<IonCol>
							<IonRow>
								<IonIcon
									className='imageIcon'
									icon={cameraOutline}
								/>
								<span className='imageInfoText'>
									上傳照片 上傳數量3張
								</span>
							</IonRow>
							<IonRow className='imageText'>
								{images.length > 0 &&
									images.map((image) => (
										<IonCol
											key={images.indexOf(image) + 100}
											size='4'>
												<img
													className='inputImage'
													src={image.webPath}></img>
											<IonIcon
											size="large"
											className='closeCircleOutline'
											icon={closeCircleOutline}
												onClick={() => {
													let delNumber =
														images.indexOf(image)
													console.log(delNumber)

													// images.filter(image => images.indexOf(image))

													setimages((images) => {
														let array = [...images]
														array.splice(
															delNumber,
															1
														)
														return array
													})
													console.log(images)
												}}/>
										</IonCol>
									))}
							</IonRow>
						</IonCol>
						<IonCol size='2' className='rightButtonCol'>
							<IonButton
								id='open-modal'
								size='large'
								fill='clear'>
								<IonIcon
									className='icon'
									icon={chevronForwardOutline}
								/>
							</IonButton>
							<IonModal
								ref={modal}
								trigger='open-modal'
								onWillDismiss={(ev) => onWillDismiss(ev)}>
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
										<IonTitle>試選擇</IonTitle>
										<IonButtons slot='end'>
											{/* <IonButton strong={true} onClick={() => confirm()}>
                  Confirm
                </IonButton> */}
										</IonButtons>
									</IonToolbar>
								</IonHeader>
								<IonContent className='ion-padding'>
									<IonItem>
										<IonButton
											size='large'
											fill='clear'
											onClick={async () => {
												if (images.length >= 3) {
													presentAlert({
														header: 'Alert',
														subHeader:
															'只限上傳3張相片',
														message: '請重新選擇!',
														buttons: ['OK']
													})
												} else {
													let getPhoto =
														await Camera.getPhoto({
															resultType:
																CameraResultType.Uri,
															source: CameraSource.Camera,
															quality: 90
														})

													console.log(getPhoto)
													if (getPhoto.webPath) {
														let photo: GalleryPhoto =
															{
																webPath:
																	getPhoto.webPath,
																format: 'jpeg'
															}
														console.log(photo)
														setimages((images) => [
															...images,
															photo
														])
													}
												}

												modal.current?.dismiss()
											}}>
											使用相機拍攝照片
										</IonButton>
										{/* <IonLabel position="stacked">使用相機拍攝照片</IonLabel> */}
									</IonItem>
									<IonItem>
										<IonButton
											size='large'
											fill='clear'
											onClick={async () => {
												let image =
													await Camera.pickImages({
														quality: 90,
														limit: 3
													})
												console.log(image)
												// console.log(image.photos.length );
												if (
													image.photos.length > 3 ||
													images.length +
														image.photos.length >
														3
												) {
													// image = { photos: [] }
													// setimages(image.photos)
													presentAlert({
														header: 'Alert',
														subHeader:
															'只限上傳3張相片',
														message: '請重新選擇!',
														buttons: ['OK']
													})
												} else {
													// setimages(image.photos)

													setimages((images) => {
														return images.concat(
															image.photos
														)
													})
												}

												modal.current?.dismiss()
											}}>
											從相片庫上傳
										</IonButton>
										{/* <IonLabel position="stacked">從相片庫上傳</IonLabel> */}
									</IonItem>
								</IonContent>
							</IonModal>
						</IonCol>
					</IonRow>
					<IonRow className='transcriptionBar'>
						<IonCol>
							<IonRow className='audioInfo'>
								<IonIcon
									className='locationIcon'
									icon={micOutline}
								/>
								上傳語音識別結果
							</IonRow>
							<IonRow>
								<span>文字結果 : {transcription}</span>
							</IonRow>
							<IonRow className='audioBox'>
								<audio
									controls
									className='playaudio'
									controlsList='nodownload'
									preload='metadata'
									src={speakUrl}></audio>
							</IonRow>
						</IonCol>
					</IonRow>

					<IonRow className='submitBar'>
						<button
							className='submitBar'
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
