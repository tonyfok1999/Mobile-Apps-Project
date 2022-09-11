import { AppDispatch, RootState } from "../store"
import { Message } from "./state"

export function loadMessages(message: Message[]) {
    return {
        type: '@@message/LOAD_MESSAGES' as const,
        messages: message
    }
}

export type LoadingMessagesAction = ReturnType<typeof loadMessages>

export function startLoading() {
    return { type: '@@message/START_LOADING' as const }
}

export type StartLoadingAction = ReturnType<typeof startLoading>

export function finishLoading() {
    return { type: '@@message/FINISH_LOADING' as const}
}

export type FinishLoadingAction = ReturnType<typeof finishLoading>

export function failLoading() {
    return { type: '@@message/FAIL_LOADING' as const}
}

export type FailLoadingAction = ReturnType<typeof failLoading>

export function getMessages() {
    return async (dispatch: AppDispatch, getState: () => RootState) => {

        if (getState().messages.loadingState === true || getState().messages.loadingState === false) { return }

        dispatch(startLoading())

        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/chatroom/:chatroomId/message`);
            const json = await res.json();

            dispatch(loadMessages(json))

            dispatch(finishLoading())

        } catch (e) {
            dispatch(failLoading())
        }
    }
}

export function postMessages(message: Message) {
    return async (dispatch: AppDispatch, getState: () => RootState) => {

        try {
            await fetch(`${process.env.REACT_APP_BACKEND_URL}/chatroom/:chatroomId/message`, {
                method: 'POST',
                headers: { 'Content-Type': 'multipart/form-data' },
                body: JSON.stringify({ sender_id: message.sender_id, text: message.text })
            });

            console.log({ 'message': 'post message successfully' })

        } catch (e) {
            console.log(e)
        }
    }
}

export type MessageActions = StartLoadingAction | LoadingMessagesAction | FinishLoadingAction | FailLoadingAction
