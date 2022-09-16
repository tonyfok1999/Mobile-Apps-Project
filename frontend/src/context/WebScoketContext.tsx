import {createContext} from 'react'
import {io, Socket} from 'socket.io-client'

const token = localStorage.getItem('token') ?? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRlZmF1bHQgdXNlciIsImlkIjoiMCIsImlhdCI6MTUxNjIzOTAyMn0.-7p4o1_cn-uQTsfoK1kmuVMVTFYH_BoU6dayDGPKPJg'

export const socket = io(`${process.env.REACT_APP_BACKEND_URL}`, {extraHeaders:{Authorization: token!}})
export const WebSocketContext = createContext<Socket>(socket)

export const WebSocketProvider =WebSocketContext.Provider