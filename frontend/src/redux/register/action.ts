import { Account } from './state'

export const storeAccount = (account: Account) => {
	return {
		type: '@@register/storeAccount' as const,
		account: account
	}
}
export type storeAccount = ReturnType<typeof storeAccount>
export type registerAction = storeAccount
