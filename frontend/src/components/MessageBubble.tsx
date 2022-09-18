/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import './MessageBubble.css'
import { EmotionJSX } from '@emotion/react/types/jsx-namespace'
import React from 'react'
import { Message } from './ChatContainer'

function MessageBubble(props: { content?: Message }) {
	return (
		<>
			<div css={css`
			margin: 1rem
			`}
				className={`message ${
					props.content?.sender_id == 1 ? 'sender' : 'receiver'
				}`}>
				<div className='content'>{props.content?.text}</div>
			</div>
		</>
	)
}

export default MessageBubble
