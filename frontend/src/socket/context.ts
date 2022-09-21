import { createContext } from 'react'
import { Socket } from 'socket.io-client'

export interface ISocketContextState {
	socket: Socket | undefined
	uid: string
	users: string[]
}

export const defaultSocketContextState: ISocketContextState = {
	socket: undefined,
	uid: '',
	users: []
}

export type TSocketContextActions = 'updateSocket' | 'updateUid' | 'updateUsers' | 'removeSocket'

export type TSocketContextPayload = string | string[] | Socket

export interface ISocketContextActions {
	type: TSocketContextActions
	payload: TSocketContextPayload
}

export const SocketReducer = (
	state: ISocketContextState,
	action: ISocketContextActions
) => {
	switch (action.type) {
		case 'updateSocket':
			return { ...state, socket: action.payload as Socket }
		case 'updateUid':
			return { ...state, uid: action.payload as string }
		case 'updateUsers':
			return { ...state, users: action.payload as string[] }
		case 'removeSocket':
			return { ...state, users: state.users.filter((uid) => uid !== (action.payload as string)) }
        default:
            return {...state}
        }
}

export interface ISocketContextProps {
    SocketState: ISocketContextState;
    SocketDispatch: React.Dispatch<ISocketContextActions>;
}

const SocketContext = createContext<ISocketContextProps>({
    SocketState: defaultSocketContextState,
    SocketDispatch: () => {}
});

export const SocketContextConsumer = SocketContext.Consumer;
export const SocketContextProvider = SocketContext.Provider;

export default SocketContext;