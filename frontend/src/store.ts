import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { type } from 'os'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { authReducer } from './redux/auth/reducer'
import { districtReducer } from './redux/districts/reducer'
import { registerReducer } from './redux/register/reducer'

const reducers = combineReducers({
	auth: authReducer,
	districts: districtReducer,
	register: registerReducer
})

export type RootState = ReturnType<typeof reducers>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const store = configureStore({
	reducer: reducers
})
