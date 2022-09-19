import {createContext} from 'react'
import {io, Socket} from 'socket.io-client'

const token = localStorage.getItem('token') ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJub25lIiwiaWF0IjoxNTE2MjM5MDIyfQ.vypkJZMdJwY7qVYGyg3VQNfNSRj39KO7mkVP2y59fBk"

export const socket = io(`${process.env.REACT_APP_BACKEND_URL}`, {extraHeaders:{Authorization: token!}})
export const WebSocketContext = createContext<Socket>(socket)

export const WebSocketProvider =WebSocketContext.Provider