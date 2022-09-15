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
import ClientTabBar from '../nav/ClientTabBar'
import { useEffect } from 'react'
import { async } from 'rxjs'

const HomePage: React.FC = () => {

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
						<IonButton fill='clear' routerLink='/Speak/SpeakPage'>
							<h3>按一下開始</h3>
						</IonButton>
					</IonCol>
				</IonRow>
			</IonGrid>
			<ClientTabBar />
		</IonPage>
	)
}

export default HomePage
