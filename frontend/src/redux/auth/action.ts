import { User } from './state'

export function loggedIn(users: User[]) {
	return {
		type: '@@auth/loggedIn' as const,
		users: users
	}
}
export function loggedOut(users: User[]) {
	return {
		type: '@@auth/loggedOut' as const
	}
}

export type LoggedInAction = ReturnType<typeof loggedIn>

export type LoggedOutAction = ReturnType<typeof loggedOut>

export type AuthActions = LoggedInAction | LoggedOutAction
