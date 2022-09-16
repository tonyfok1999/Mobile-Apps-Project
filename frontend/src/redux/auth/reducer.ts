import { AuthActions, loggedIn } from './action'
import { User } from './state'

export interface AuthState {
	user: User | null
	token: string | null
	isLogin: boolean | null
}

const initialState: AuthState = {
	user: null,
	token: null,
	isLogin: null
}

export function authReducer(
	state: AuthState = initialState,
	action: AuthActions
): AuthState {
	switch (action.type) {
		case '@@auth/loggedIn':
			return {
				...state,
				user: action.user,
				token: action.token,
				isLogin: true
			}
		case '@@auth/loggedOut':
			return {
				...state,
				user: null,
				token: null,
				isLogin: false
			}
		default:
			return state
	}
}
