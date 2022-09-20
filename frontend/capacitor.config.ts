import { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
	appId: 'io.ionic.starter',
	appName: 'Repair-matching',
	webDir: 'build',
	bundledWebRuntime: false,
	plugins: {
		GoogleAuth: {
			scopes: ['profile', 'email'],
			serverClientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
			forceCodeForRefreshToken: true
		}
	}
}

export default config
