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
import DetailsOfRecordingContent from '../components/DetailsOfRecordingContent'
import { micOutline } from 'ionicons/icons'
export default function SpeakPage() {
	return (
		<IonContent
			css={css`
				img {
					width: 60%;
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
					height: 30vh;
				}
				.DetailsOfRecordingContent {
					font-size: x-large;
				}
				.buttonRow {
                    padding: 0;
					height: 30vh;
				}
                .textButton{
                    display: flex;
                    justify-content: center;
					align-items: flex-end;

                }

                .iconButton{
                    
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

					<IonCol class='textButton' size='12'>
						<IonButton
                        
							size='large'
							fill='clear'
							routerLink="/SpeakTest">
							<h3>按一下開始說話</h3>
						</IonButton>
					</IonCol>
					<IonCol class='iconButton'size='12'>
						<IonButton
							size='large'
							fill='clear'
							routerLink="/SpeakTest">
							<IonIcon className='mic icon' icon={micOutline} />
						</IonButton>
					</IonCol>

				</IonRow>
			</IonGrid>



		</IonContent>
	)
}
