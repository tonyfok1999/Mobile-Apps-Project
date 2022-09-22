import {SpeakData} from './state'

export function changeDistrict(district:number) {
	return {
		type: '@@speak/CHANGE_DISTRICT' as const,
		district:district
	}
}
export function changeServiceSubType(serviceSubType:number[]) {
	return {
		type: '@@speak/CHANGE_SERVICESUBTYPE' as const,
		serviceSubType:serviceSubType
	}
}
export function changeServiceType(serviceType:number) {
	return {
		type: '@@speak/CHANGE_SERVICETYPE' as const,
		serviceType:serviceType
	}
}
export function changeBudget(budget:number) {
	return {
		type: '@@speak/CHANGE_BUDGET' as const,
		budget:budget
	}
}
export function changeImageFileName(imageFileName:string[]) {
	return {
		type: '@@speak/CHANGE_IMAGEFILENAME' as const,
		imageFileName:imageFileName

	}
}
export function changeSpeakFileName(speakFileName:string) {
	return {
		type: '@@speak/CHANGE_SPEAKFILENAME' as const,
		speakFileName:speakFileName

	}
}
export function changeTranscription(transcription:string) {
	return {
		type: '@@speak/CHANGE_TRANSCRIPTION' as const,
		transcription:transcription
	}
}
export function changeSpeakURL(speakURL:string) {
	return {
		type: '@@speak/CHANGE_SPEAKURL' as const,
		speakURL:speakURL
	}
}

export type ChangeDistrictAction = ReturnType<typeof changeDistrict>
export type ChangeServiceSubTypeAction = ReturnType<typeof changeServiceSubType>
export type ChangeServiceTypeAction = ReturnType<typeof changeServiceType>
export type ChangeBudgetAction = ReturnType<typeof changeBudget>
export type ChangeImageFileNameAction = ReturnType<typeof changeImageFileName>
export type ChangeSpeakFileNameAction = ReturnType<typeof changeSpeakFileName>
export type ChangeTranscriptionAction = ReturnType<typeof changeTranscription>
export type ChangeSpeakURLAction = ReturnType<typeof changeSpeakURL>

export type SpeakActions =
	| ChangeDistrictAction
	| ChangeServiceSubTypeAction
	| ChangeBudgetAction
	| ChangeImageFileNameAction
    | ChangeSpeakFileNameAction
    | ChangeTranscriptionAction
	| ChangeServiceTypeAction
	| ChangeSpeakURLAction
