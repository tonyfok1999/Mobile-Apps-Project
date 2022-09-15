export interface SpeakData {
	district: number
	serviceSubType: number[]
    serviceType:number
    budget?:number |null
    imageFileName?:string[] |null
    speakFileName?:string |null
    transcription?:string |null
}
