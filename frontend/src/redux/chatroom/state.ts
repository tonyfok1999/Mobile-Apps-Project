interface Attendee {
	user_id: number, nickname: string
}
export interface Chatroom {
	chatroom_id: number
    nickname?: string
	sender_id: number
	text: string
	lastUpdateTime: string
	attendees: Attendee[]
}