import {createContext} from 'react'
import {io, Socket} from 'socket.io-client'

const token = localStorage.getItem('token') ?? 'newUser'
export const socket = io(`${process.env.REACT_APP_BACKEND_URL}`, {extraHeaders:{Authorization: token!}, timeout: 200000})
export const WebSocketContext = createContext<Socket>(socket)
export const WebSocketProvider =WebSocketContext.Provider
