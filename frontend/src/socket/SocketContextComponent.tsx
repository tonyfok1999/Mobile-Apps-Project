import React, { PropsWithChildren, useEffect, useReducer, useState } from 'react'
import { io, Socket } from 'socket.io-client';
import { useAppSelector } from '../store';
import { SocketContextProvider } from './SocketContext';

export interface ISocketContextComponentProps extends PropsWithChildren {}

const SocketContextComponent: React.FunctionComponent<ISocketContextComponentProps> = (props) => {
    const { children } = props;
    const [socket, setSocket] = useState<Socket | null>(null)
    const token = useAppSelector((state)=> state.token.token) // redux useSelector

    useEffect(() => {

      // const socket = io(`${process.env.REACT_APP_BACKEND_URL}`, {extraHeaders:{Authorization: token!}});
      const socket = io(`https://matching.c21-yin.me`,  {auth: {authorization: window.localStorage.token}});
      // const socket = io(`${process.env.REACT_APP_BACKEND_URL}`,  {auth: {authorization: window.localStorage.token}});
      
      socket.connect();
      setSocket(socket)
      return () => {
        socket.disconnect();
      } 
    }, [setSocket, token]);

  return (
    <SocketContextProvider value={{ socket }}>{children}</SocketContextProvider>
  )
}

export default SocketContextComponent
