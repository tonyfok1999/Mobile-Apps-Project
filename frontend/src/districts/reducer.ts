import { DistrictsActions } from './action'
import { District } from './state'

export interface DistrictsState {
	districts: District[]
}

const initialState: DistrictsState = {
	districts: []
}

export const districtReducer = (
	state: DistrictsState = initialState,
	action: DistrictsActions
): DistrictsState => {
	switch (action.type) {
		case '@@district/loadDistricts':
			return {
				...state,
				districts: action.districts
			}
		default:
			return state
	}
}
