import { AppDispatch, RootState } from "../../store"
import { Chatroom } from "./state"

export function loadChatrooms(chatroom: Chatroom[]) {
    return {
        type: '@@chatroom/LOAD_MESSAGES' as const,
        chatrooms: chatroom
    }
}

export type LoadingChatroomsAction = ReturnType<typeof loadChatrooms>

export function startLoading() {
    return { type: '@@chatroom/START_LOADING' as const }
}

export type StartLoadingAction = ReturnType<typeof startLoading>

export function finishLoading() {
    return { type: '@@chatroom/FINISH_LOADING' as const}
}

export type FinishLoadingAction = ReturnType<typeof finishLoading>

export function failLoading() {
    return { type: '@@chatroom/FAIL_LOADING' as const}
}

export type FailLoadingAction = ReturnType<typeof failLoading>

// export function getChatroom() {
//     return async (dispatch: AppDispatch, getState: () => RootState) => {

//         if (getState().chatrooms.loadingState === true || getState().chatrooms.loadingState === false) { return }

//         dispatch(startLoading())

//         try {
//             const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/chatroom/:chatroomId/message`);
//             const json = await res.json();

//             dispatch(loadChatrooms(json))

//             dispatch(finishLoading())

//         } catch (e) {
//             dispatch(failLoading())
//         }
//     }
// }

// export function postMessages(message: Message) {
//     return async (dispatch: AppDispatch, getState: () => RootState) => {

//         try {
//             await fetch(`${process.env.REACT_APP_BACKEND_URL}/chatroom/:chatroomId/message`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'multipart/form-data' },
//                 body: JSON.stringify({ sender_id: message.sender_id, text: message.text })
//             });

//             console.log({ 'message': 'post message successfully' })

//         } catch (e) {
//             console.log(e)
//         }
//     }
// }

export type ChatroomActions = StartLoadingAction | LoadingChatroomsAction | FinishLoadingAction | FailLoadingAction
