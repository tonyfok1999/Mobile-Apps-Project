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

export type ChatroomActions = StartLoadingAction | LoadingChatroomsAction | FinishLoadingAction | FailLoadingAction
