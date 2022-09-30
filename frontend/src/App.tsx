import { Route } from 'react-router-dom'
import {
	IonApp,
	IonRouterOutlet,
	setupIonicReact,
} from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'

/* Import Bootstrap */
import 'bootstrap/dist/css/bootstrap.min.css'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'

/* Theme variables */
import './theme/variables.css'

/* import page */
import WorkerLoginPage from './pages/WorkerLoginPage'
import WorkerRegisterPage from './pages/WorkerRegisterPage'
import WorkerRegisterPageForTypeOfService from './pages/WorkerRegisterPageForTypeOfService'
import SpeakPage from './pages/SpeakPage'

// import SpeakTest from './pages/SpeakRecord'
import HomePage from './pages/HomePage'
import ChatList from './pages/ChatList'
import ChatRoom from './pages/ChatRoom'
import WorkerOrderPage from './pages/WorkerOrderPage'
import OrderDetailPage from './pages/OrderDetailPage'
import RegisterSuccess from './pages/RegisterSuccess'
import SpeakDetailPage from './pages/SpeakDetailPage'
import ChangeDistricts from './pages/ChangeDistricts'
import ChangeSubType from './pages/ChangeSubType'

setupIonicReact()

const App: React.FC = () => {
	return (
		<IonApp>
			<IonReactRouter>
				<IonRouterOutlet>
					<Route exact path='/'>
						<HomePage />
					</Route>
					<Route
						exact
						path='/Speak/SpeakPage'
						component={SpeakPage}
					/>
					<Route exact path='/tabs/chatlist' component={ChatList} />
					<Route
						exact
						path='/tabs/changeDistricts'
						component={ChangeDistricts}
					/>
					<Route
						exact
						path='/tabs/changeSubType'
						component={ChangeSubType}
					/>
					<Route
						exact
						path='/Speak/SpeakDetailPage'
						component={SpeakDetailPage}
					/>

					<Route path='/chatroom/:chatroomId' component={ChatRoom} />
					<Route
						exact
						path='/workerLoginPage'
						component={WorkerLoginPage}
					/>

					<Route
						exact
						path='/workerRegisterPage'
						component={WorkerRegisterPage}
					/>
					<Route
						exact
						path='/workerRegisterPageForTypeOfService'
						component={WorkerRegisterPageForTypeOfService}
					/>
					<Route
						exact
						path='/tab/workerOrderPage'
						component={WorkerOrderPage}
					/>
					<Route
						exact
						path='/orderDetailPage/:id'
						component={OrderDetailPage}
					/>
					<Route
						exact
						path='/registerSuccess'
						component={RegisterSuccess}
					/>
				</IonRouterOutlet>
			</IonReactRouter>
		</IonApp>
	)
}

export default App
