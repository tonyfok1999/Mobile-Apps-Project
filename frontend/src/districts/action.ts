import { District } from './state'

export function loadDistricts(districts: District[]) {
	return {
		type: '@@district/loadDistricts' as const,
		districts: districts
	}
}

export type LoadDistrictsAction = ReturnType<typeof loadDistricts>
export type DistrictsActions = LoadDistrictsAction
