/** @jsxImportSource @emotion/react */

import Logo from '../components/Logo'
import { css } from '@emotion/react'
import UserTabBar from '../components/UserTabBar'
import {
	IonButtons,
	IonToolbar,
	IonBackButton,
	IonTitle,
	IonButton,
	IonIcon,
	IonMenuButton,
	IonContent,
	IonGrid,
	IonRow,
	IonCol
} from '@ionic/react'

export default function HomePage() {
	return (
		<IonContent
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
					height: 25vh;
				}
				.UserTabBarRow {
					height: 10vh;
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
						<IonButton fill='clear' onClick={() => {}}>
							<h3>按一下開始</h3>
						</IonButton>
					</IonCol>
				</IonRow>
				<IonRow className='UserTabBarRow'>
					<UserTabBar />
				</IonRow>
			</IonGrid>
		</IonContent>
	)
}
