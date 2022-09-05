/** @jsxImportSource @emotion/react */
import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar
} from '@ionic/react'
import Logo from '../components/Logo'
import { css } from '@emotion/react'
import UserTabBar from '../components/UserTabBar'

export default function HomePage() {
	return (
		<div
			css={css`
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				padding: 1%;

				img {
					max-width: 60%;
				}
				h1 {
					max-width: 70%;

					text-align: center;
					display: table-cell;
					/* vertical-align: middle; */
					font-weight: bold;
					/* background: linear-gradient(
						to right,
						rgb(56, 28, 129),
						rgb(254, 121, 89)
					);
					-webkit-background-clip: text;
					color: transparent; */
				}
				h3 {
					font-size:bold ;
					background: linear-gradient(
						45deg,
						rgb(56, 28, 129),
						rgb(254, 121, 89)
					);
					-webkit-background-clip: text;
					color: transparent;

				}
			`}>
			<Logo />
			<h1>只需要以語音說明你所需要的服務便可</h1>
			<h3>按一下開始</h3>
			<UserTabBar/>
		</div>
	)
}
