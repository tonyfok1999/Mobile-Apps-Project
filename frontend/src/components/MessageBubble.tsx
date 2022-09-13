/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { EmotionJSX } from '@emotion/react/types/jsx-namespace'
import React from 'react'
import {Message} from './ChatContainer'

function MessageBubble(props:{content?:Message}) {
	return (
		<>
			<h1>{props.content?.text}</h1>
		</>
	)
}

export default MessageBubble
