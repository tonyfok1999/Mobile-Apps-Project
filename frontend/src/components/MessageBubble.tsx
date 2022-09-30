/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import './MessageBubble.css'
import { Message } from './ChatInput'
import { useAppSelector } from '../store'

function MessageBubble(props: { content?: Message }) {
	const userId = useAppSelector((state) => state.auth.user!.id)
	
	return (
		<>
			<div css={css`
			margin: 1rem
			`}
				className={`message ${
					props.content?.sender_id == userId ? 'sender' : 'receiver'
				}`}>
				<div className='content'>{props.content?.text}</div>
			</div>
		</>
	)
}

export default MessageBubble
