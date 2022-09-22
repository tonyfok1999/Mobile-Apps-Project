import { Token } from "./state"

export function loadToken(token: Token) {
    return {
        type: '@@LOAD_TOKEN' as const,
        token: token
    }
}

export type TokenAction = ReturnType<typeof loadToken>


