import { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
	appId: 'io.ionic.starter',
	appName: 'Repair-matching',
	webDir: 'build',
	bundledWebRuntime: false,
	plugins: {
		GoogleAuth: {
			scopes: ['profile', 'email'],
			serverClientId:
				'708322933526-0359al7b0ul1qll3i971rqu49jb7d7co.apps.googleusercontent.com',
			forceCodeForRefreshToken: true
		}
	}
}

export default config
