import { MessageActions } from "./action"
import { Message } from "./state"

export interface MessageState {
    messages: Message[],
    loadingState: boolean | null
}
  
const initialState: MessageState = {
    messages: [],
    loadingState: null
}
  
  export const messageReducer = (state: MessageState = initialState, action: MessageActions): MessageState => {
    switch (action.type) {
      case '@@message/LOAD_MESSAGES':
        return {
          ...state,
          messages: action.messages
        }
      case '@@message/START_LOADING':
        return {
          ...state,
          loadingState: true
        }
      case '@@message/FINISH_LOADING':
        return {
          ...state,
          loadingState: false
        }
      case '@@message/FAIL_LOADING':
        return {
          ...state,
          loadingState: null
        }
      default:
        return state;
    }
  }
  