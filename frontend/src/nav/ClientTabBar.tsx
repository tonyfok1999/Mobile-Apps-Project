/** @jsxImportSource @emotion/react */
// import Tab from 'react-bootstrap/Tab'
// import Tabs from 'react-bootstrap/Tabs'

import { css } from '@emotion/react'

import React, { useState } from 'react'
import {
	IonTabs,
	IonRouterOutlet,
	IonTabBar,
	IonTabButton,
	IonIcon,
	IonLabel,
	IonContent,
	IonBadge
} from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { chatbubblesOutline, micOutline } from 'ionicons/icons'
import { Route, Redirect } from 'react-router'

import ChatTab from '../components/ChatTab'
import HomePage from '../pages/HomePage'
import ChatList from '../pages/ChatList'

// export default function ChatTab() {
//   return (
//     <div>ChatTab</div>
//   )
// }

const ClientTabBar: React.FC = () => {
	return (
		<IonReactRouter>

			<IonTabs>
				<IonRouterOutlet>
				
					<Route exact path='/tabs/chatlist' component={ChatList}/>
		                
				</IonRouterOutlet>

				<IonTabBar slot='bottom'>
					<IonTabButton  tab='homepage'  href='/'>
					<IonIcon className='micIcon' icon={micOutline} />

					</IonTabButton>
					<IonTabButton tab='chatlist' href='/tabs/chatlist'>
					<IonIcon className='micIcon' icon={chatbubblesOutline} />
					</IonTabButton>
				</IonTabBar>
			</IonTabs>
		</IonReactRouter>


	)
}

export default ClientTabBar
