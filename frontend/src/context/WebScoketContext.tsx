import {createContext} from 'react'
import {io, Socket} from 'socket.io-client'

export const socket=io(`${process.env.REACT_APP_BACKEND_URL}`)
export const WebSocketContext = createContext<Socket>(socket)

export const WebSocketProvider =WebSocketContext.Provider