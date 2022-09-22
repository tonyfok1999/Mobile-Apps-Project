import { createContext } from 'react'
import { Socket } from 'socket.io-client'

export interface ISocketContextProps {
    socket: Socket | null
}

const SocketContext = createContext<ISocketContextProps>({
    socket: null
});

export const SocketContextConsumer = SocketContext.Consumer;
export const SocketContextProvider = SocketContext.Provider;

export default SocketContext;
