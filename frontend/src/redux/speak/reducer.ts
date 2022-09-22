import { SpeakActions } from './action'
import { SpeakData } from './state'
const defaultState = {
	district: 1,
	serviceSubType: [1],
	serviceType: 2,
	budget: 0,
	imageFileName: [],
	speakFileName: ' ',
	transcription: '沒有語音識別結果',
	speakURL:''
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
		case'@@speak/CHANGE_SPEAKURL':
		return {
			...state,
			speakURL:action.speakURL
		}


	default: return state
	}
}
