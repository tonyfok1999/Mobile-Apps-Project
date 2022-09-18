import { ChatroomActions } from "./action"
import { Chatroom } from "./state"

export interface ChatroomState {
    chatrooms: Chatroom[],
    loadingState: boolean | null
}
  
const initialState: ChatroomState = {
    chatrooms: [],
    loadingState: null
}
  
  export const chatroomReducer = (state: ChatroomState = initialState, action: ChatroomActions): ChatroomState => {
    switch (action.type) {
      case '@@chatroom/LOAD_MESSAGES':
        return {
          ...state,
          chatrooms: action.chatrooms
        }
      case '@@chatroom/START_LOADING':
        return {
          ...state,
          loadingState: true
        }
      case '@@chatroom/FINISH_LOADING':
        return {
          ...state,
          loadingState: false
        }
      case '@@chatroom/FAIL_LOADING':
        return {
          ...state,
          loadingState: null
        }
      default:
        return state;
    }
  }
  