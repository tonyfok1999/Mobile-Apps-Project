import { useEffect } from "react";
import { getMessages } from "../messages/action";
import { useAppSelector, useAppDispatch } from "../store";

export function useMessages() {
    const messages = useAppSelector(state => state.messages.messages)
    const LoadingState = useAppSelector(state => state.messages.loadingState)
  
    const dispatch = useAppDispatch();
    useEffect(() => {
      dispatch(getMessages());
      console.log('fetching messages')
    }, [])
    
    return {
      messages,
      LoadingState
    }
  }