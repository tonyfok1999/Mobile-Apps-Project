import { AuthActions, loggedIn } from './action'
import { User } from './state'

export interface AuthState {
	user: User | null
}

const initialState: AuthState = {
	user: null
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
				user: null
			}
	}
}
