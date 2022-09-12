import { registerAction } from './action'
import { Account } from './state'

export interface registerState {
	account: Account | null
}

const initialState: registerState = {
	account: null
}

export const registerReducer = (
	state: registerState = initialState,
	action: registerAction
) => {
	if (action.type === '@@register/storeAccount') {
		return {
			...state,
			account: action.account
		}
	} else {
		return state
	}
}
