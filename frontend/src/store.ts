import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { type } from 'os'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { authReducer } from './redux/auth/reducer'
import { chatroomReducer } from './redux/chatroom/reducer'
import { districtReducer } from './redux/districts/reducer'
import { registerReducer } from './redux/register/reducer'
import { speakReducer } from './redux/speak/reducer'
import { tokenReducer } from './redux/token/reducer'


const reducers = combineReducers({
	auth: authReducer,
	districts: districtReducer,
	register: registerReducer,
	speak: speakReducer,
	chatroom: chatroomReducer,
	token: tokenReducer
})

export type RootState = ReturnType<typeof reducers>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const store = configureStore({
	reducer: reducers
})
