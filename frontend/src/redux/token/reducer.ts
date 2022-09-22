import { TokenAction } from "./action"
import { Token } from "./state"

export interface TokenState {
    token: string | null
}
  
const initialState: TokenState = {
    token: null
}
  
  export const tokenReducer = (state: TokenState = initialState, action: TokenAction): TokenState => {
    switch (action.type) {
      case '@@LOAD_TOKEN':
        return {
          ...state,
          token: action.token
        }
      default:
        return state;
    }
  }
  