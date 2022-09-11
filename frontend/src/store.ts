import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { type } from 'os'
import { authReducer } from './redux/auth/reducer'
import { districtReducer } from './redux/districts/reducer'

const reducers = combineReducers({
	auth: authReducer,
	districts: districtReducer
})

export type RootState = ReturnType<typeof reducers>

export const store = configureStore({
	reducer: reducers
})
