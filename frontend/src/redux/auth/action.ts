import { User } from './state'

export function loggedIn(user: User) {
	return {
		type: '@@auth/loggedIn' as const,
		user: user
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
