/** @jsxImportSource @emotion/react */
import React from 'react'
import {
	IonButton,
	IonGrid,
	IonRow,
	IonCol
} from '@ionic/react'

import { css } from '@emotion/react'

import BackIcon from './BackIcon'

export default function TopBar(props:{
	thisBackPath:string,}) {
	return (
		<IonGrid
			css={css`
				.loginButton{
                    color: orange;
                    margin-right: 10px;
                }
                .loginCol{
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                   
                }
			`}>
			<IonRow>

				<IonCol size='4' className=''>
				<BackIcon thisPath={props.thisBackPath}/>
				</IonCol>

				<IonCol size='8' className='loginCol'>
                    <a>師傅加入我們？</a>
					<IonButton className="loginButton" type='button'fill='clear' routerLink="/workerLoginPage" >
						<a>註冊/登入</a>
					</IonButton>
				</IonCol>

			</IonRow>
		</IonGrid>
	)
}

