/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { EmotionJSX } from '@emotion/react/types/jsx-namespace'
import React from 'react'

function MessageBubble(props:{content:number}) {
	return (
		<>
			<h1>{props.content}</h1>
		</>
	)
}

export default MessageBubble
