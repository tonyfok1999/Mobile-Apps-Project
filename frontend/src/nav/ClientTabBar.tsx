/** @jsxImportSource @emotion/react */
// import Tab from 'react-bootstrap/Tab'
// import Tabs from 'react-bootstrap/Tabs'

import { css } from '@emotion/react'
import './ClientTabBar.css'
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
import {
	chatbubbleEllipses,
	chatbubblesOutline,
	mic,
	micOutline
} from 'ionicons/icons'
import { Route, Redirect } from 'react-router'

import ChatTab from '../components/ChatTab'
import HomePage from '../pages/HomePage'
import ChatList from '../pages/ChatList'
import { EmotionJSX } from '@emotion/react/types/jsx-namespace'
import SpeakTest from '../pages/SpeakRecord'
import SpeakPage from '../pages/SpeakPage'

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
					<Route path='/tabs/chatList' component={ChatList} />
					<Route path='/tabs/homePage' component={HomePage} />
				</IonRouterOutlet>

				<IonTabBar slot='bottom'>
					<IonTabButton tab='homepage' href='/tabs/homePage'>
						<IonIcon size='large' icon={mic} />
					</IonTabButton>
					<IonTabButton tab='chatlist' href='/tabs/chatList'>
						<IonIcon size='large' icon={chatbubbleEllipses} />
					</IonTabButton>
				</IonTabBar>
			</IonTabs>
		</IonReactRouter>
	)
}

export default ClientTabBar
