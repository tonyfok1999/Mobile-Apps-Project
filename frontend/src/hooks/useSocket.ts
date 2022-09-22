import { createContext, useEffect, useRef } from "react"
import { io, Socket } from "socket.io-client"

export const useSocket = (): Socket => {
    const token = localStorage.getItem('token') ?? 'newUser'
    const {current: socket} = useRef(io(`${process.env.REACT_APP_BACKEND_URL}`, {extraHeaders:{Authorization: token!}}))

    useEffect(()=>{
        return () => {
            if(socket)
            socket.close()
        }
    }, [socket])

    return socket
}

