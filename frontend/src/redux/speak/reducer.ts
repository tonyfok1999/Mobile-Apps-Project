import { SpeakActions } from './action'
import { SpeakData } from './state'
const defaultState = {
	district: 1,
	serviceSubType: [1],
	serviceType: 1,
	budget: 1,
	imageFileName: [],
	speakFileName: '',
	transcription: ''
}

export function speakReducer(
	state: SpeakData = defaultState,
	action: SpeakActions
) :SpeakData{
	switch (action.type) {
		case'@@speak/CHANGE_DISTRICT':
			return {
				...state,
				district:action.district
			}
		case'@@speak/CHANGE_SERVICESUBTYPE':
		return {
			...state,
			serviceSubType:action.serviceSubType
		}
		case'@@speak/CHANGE_BUDGET':
		return {
			...state,
			budget:action.budget
		}
		case'@@speak/CHANGE_IMAGEFILENAME':
		return {
			...state,
			imageFileName:action.imageFileName
		}
		case'@@speak/CHANGE_SPEAKFILENAME':
		return {
			...state,
			speakFileName:action.speakFileName
		}	
		case'@@speak/CHANGE_TRANSCRIPTION':
		return {
			...state,
			transcription:action.transcription
		}
		case'@@speak/CHANGE_SERVICETYPE':
		return {
			...state,
			serviceType:action.serviceType
		}


	default: return state
	}
}
