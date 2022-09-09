/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { IonContent, IonPage } from '@ionic/react'
import React from 'react'

export default function WorkerOrderPage() {
	return (
		<IonPage>
			<IonContent>
				<div
					className='container'
					css={css`
						display: flex;
						width: 90%;
						height: 13rem;
						justify-content: center;
						align-items: center;
						flex-direction: column;
						box-sizing: border-box;
						box-shadow: 0px 0px 10px #cccddd;
						border-radius: 1rem;
						padding: 0.5rem;
						margin-top: 1rem;
					`}>
					hi
				</div>
			</IonContent>
		</IonPage>
	)
}
