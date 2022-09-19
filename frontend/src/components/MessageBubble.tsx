/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import './MessageBubble.css'
import { EmotionJSX } from '@emotion/react/types/jsx-namespace'
import React from 'react'
import { Message } from '../../../models/message.model'
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
