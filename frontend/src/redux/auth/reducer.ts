import { AuthActions, loggedIn } from './action'
import { User } from './state'

export interface AuthState {
	user: User
}

const initialState: AuthState = {
	user: {
		id: null,
		email: null,
		nickname: null,
		phone: null,
		gender_id: null,
		profile_photo: null,
		is_worker: null,
		worker_info_id: null,
		score: null,
		token: null
	}
}

export function authReducer(
	state: AuthState = initialState,
	action: AuthActions
): AuthState {
	switch (action.type) {
		case '@@auth/loggedIn':
			return {
				...state,
				user: action.user
			}
		case '@@auth/loggedOut':
			return {
				...state,
				user: {
					id: null,
					email: null,
					nickname: null,
					phone: null,
					gender_id: null,
					profile_photo: null,
					is_worker: null,
					worker_info_id: null,
					score: null,
					token: null
				}
			}
		default:
			return state
	}
}
