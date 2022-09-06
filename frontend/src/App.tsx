import { Redirect, Route } from 'react-router-dom'
import {
	IonApp,
	IonIcon,
	IonLabel,
	IonRouterOutlet,
	IonTabBar,
	IonTabButton,
	IonTabs,
	setupIonicReact
} from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { ellipse, square, triangle } from 'ionicons/icons'

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
import HomePage from './pages/HomePage'

/* import components */
import UncontrolledExample from './components/UncontrolledExample'

/* import page */
import WorkerLoginPage from './pages/WorkerLoginPage'
import WorkerRegisterPage from './pages/WorkerRegisterPage'
import ChatList from './pages/ChatList'
import WorkerRegisterPageForTypeOfService from './pages/WorkerRegisterPageForTypeOfService'

setupIonicReact()

const App: React.FC = () => (
	<IonApp>
		<IonReactRouter>
			<IonRouterOutlet>
				<Route exact path='/' component={HomePage} />
				<Route
					exact
					path='/workerLoginPage'
					component={WorkerLoginPage}
				/>
				<Route exact path='/chatlist' component={ChatList} />
				<Route exact path='/test' component={UncontrolledExample} />
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
			</IonRouterOutlet>
		</IonReactRouter>
	</IonApp>
)

export default App
{
	/* <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/tab1">
            <Tab1 />
          </Route>
          <Route exact path="/speakPage1">
            <SpeakPage1 />
          </Route>
          <Route path="/tab3">
            <Tab3 />
          </Route>
          <Route exact path="/">
            <Redirect to="/tab1" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/tab1">
            <IonIcon icon={triangle} />
            <IonLabel>Tab 1</IonLabel>
          </IonTabButton>
          <IonTabButton tab="speakPage1" href="/speakPage1">
            <IonIcon icon={ellipse} />
            <IonLabel>SpeakPage1</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/tab3">
            <IonIcon icon={square} />
            <IonLabel>Tab 3</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter> */
}
