import { AuthActions, loggedIn } from './action'
import { User } from './state'

export interface AuthState {
	users: User[] | null
}

const initialState: AuthState = {
	users: []
}

export function authReducer(
	state: AuthState = initialState,
	action: AuthActions
): AuthState {
	switch (action.type) {
		case '@@auth/loggedIn':
			return {
				...state,
				users: action.users
			}
		case '@@auth/loggedOut':
			return {
				...state,
				users: null
			}
	}
}
