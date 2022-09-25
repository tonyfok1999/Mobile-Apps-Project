/** @jsxImportSource @emotion/react */

import Logo from '../components/Logo'
import { css } from '@emotion/react'
import UserTabBar from '../components/UserTabBar'
import {
	IonButton,
	IonGrid,
	IonRow,
	IonCol,
	IonPage,
	IonContent,
	useIonRouter
} from '@ionic/react'
import { Preferences } from '@capacitor/preferences';
import ClientTabBar from '../nav/ClientTabBar'
import { useEffect } from 'react'
import { async } from 'rxjs'
import { useAppDispatch } from '../store'
import { useHistory } from 'react-router'
import { loggedIn } from '../redux/auth/action'
import { loadToken } from '../redux/token/action'

const HomePage: React.FC = () => {
	const dispatch = useAppDispatch()
	const history = useHistory()

	useEffect(() => {
		;(async () => {
			const token = localStorage.getItem('token')
			// const ret = await Preferences.get({ key: 'user' });
			if (token == null) {
				const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}`)
				const token = (await res.json()).Authorization

				console.log(`the ${token} has been retrieved from the server`)
				localStorage.setItem('token', token)
				console.log(`the token ${token} has been saved in localStorage`)

				const resMe = await fetch(
					`${process.env.REACT_APP_BACKEND_URL}/user/me`,
					{ headers: { Authorization: `Bearer ${token}` } }
				)
				const userinfo = await resMe.json()
				dispatch(loggedIn(userinfo[0], token))
				dispatch(loadToken(token))
			} else {
				const res = await fetch(
					`${process.env.REACT_APP_BACKEND_URL}/user/me`,
					{ headers: { Authorization: `Bearer ${token}` } }
				)
				const userinfo = await res.json()
				console.log(userinfo);
				dispatch(loggedIn(userinfo[0], token))
				dispatch(loadToken(token))

				if (userinfo[0].is_worker) {
					history.replace('/tab/workerOrderPage')
				}
			}

			// const res = await fetch(
			// 	`${process.env.REACT_APP_BACKEND_URL}/worker-auth/login`,
			// 	{
			// 		method: 'post',
			// 		headers: { Authorization: `Bearer ${token}` }
			// 	}
			// )

			// if (res.status === 200) {
			// 	const user = await res.json()
			// 	dispatch(loggedIn(user))
			// } else {
			// 	dispatch(logOut())
			// }
		})()
	}, [])

	return (
		<IonPage
			css={css`
				img {
					width: 60%;
					/* height: 60%; */
				}
				h1 {
					max-width: 70%;

					text-align: center;
					/* display: table-cell; */
					font-weight: bold;
				}
				h3 {
					font-size: bold;
					background: linear-gradient(
						45deg,
						rgb(56, 28, 129),
						rgb(254, 121, 89)
					);
					-webkit-background-clip: text;
					color: transparent;
				}
				.userTabBar {
				}
				.center {
					display: flex;
					justify-content: center;
					align-items: center;
				}
				.logoCol {
					height: 40vh;
				}
				.infoCol {
					height: 20vh;
				}
				.info2Col {
					height: 30vh;
				}
				.UserTabBarRow {
					height: 5vh;
				}
				* {
					padding: 0;
					margin: 0;
				}
			`}>
			<IonContent>
				<IonGrid>
					<IonRow className='logoCol'>
						<IonCol className='center'>
							<Logo />
						</IonCol>
					</IonRow>
					<IonRow className='infoCol'>
						<IonCol className='center'>
							<h1>只需要以語音說明你所需要的服務便可</h1>
						</IonCol>
					</IonRow>
					<IonRow className='info2Col'>
						<IonCol className='center'>
							<IonButton
								fill='clear'
								routerLink='/Speak/SpeakPage'>
								<h3>按一下開始</h3>
							</IonButton>
						</IonCol>
					</IonRow>
				</IonGrid>
			</IonContent>
			<ClientTabBar />
		</IonPage>
	)
}

export default HomePage
