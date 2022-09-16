import { AppDispatch } from '../../store'
import { User } from './state'

export function loggedIn(user: User, token: string) {
	return {
		type: '@@auth/loggedIn' as const,
		user: user,
		token: token
	}
}

export function loggedOut() {
	return {
		type: '@@auth/loggedOut' as const
	}
}

export type LoggedInAction = ReturnType<typeof loggedIn>

export type LoggedOutAction = ReturnType<typeof loggedOut>

export type AuthActions = LoggedInAction | LoggedOutAction

export function logOut() {
	return (dispatch: AppDispatch) => {
		localStorage.removeItem('token')
		dispatch(loggedOut())
	}
}
