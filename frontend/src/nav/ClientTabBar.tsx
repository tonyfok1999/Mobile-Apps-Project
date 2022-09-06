import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import React, { useState } from 'react'
import {
	IonTabs,
	IonRouterOutlet,
	IonTabBar,
	IonTabButton,
	IonIcon,
	IonLabel
} from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { triangle, ellipse, square, callOutline, home, chatbubbleEllipses } from 'ionicons/icons'
import { Route, Redirect } from 'react-router'
import Tab1 from '../pages/Tab1'
import Tab3 from '../pages/Tab3'
import ChatTab from '../components/ChatTab'
import HomePage from '../pages/HomePage'
import ChatList from '../pages/ChatList'
import { EmotionJSX } from '@emotion/react/types/jsx-namespace'

// export default function ChatTab() {
//   return (
//     <div>ChatTab</div>
//   )
// }

// const ClientTabBar: React.FC = () => {
// 	return (
// 		<>
// 			<IonReactRouter>
// 				<IonTabs>
// 					<IonRouterOutlet>
// 						<Route exact path='/tabs/homePage'>
// 							<HomePage />
// 						</Route>
// 						<Route exact path='/tabs/chatlist'>
//                             <ChatList/>
// 						</Route>
// 					</IonRouterOutlet>
// 					<IonTabBar slot='bottom'>
// 						<IonTabButton tab='homepage' href='/tabs/homePage'>
// 							<IonIcon icon={triangle} />
// 						</IonTabButton>
// 						<IonTabButton tab='chatlist' href='/tabs/chatlist'>
// 							<IonIcon icon={ellipse} />
// 						</IonTabButton>
// 					</IonTabBar>
// 				</IonTabs>
// 			</IonReactRouter>
// 		</>
// 	)
// }


