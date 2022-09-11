/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { VscSmiley } from 'react-icons/vsc'
import Button from 'react-bootstrap/Button'
import React, { useState } from 'react'
import Picker from 'emoji-picker-react'

const ChatInput: React.FC = () => {
	const [showEmojiPicker, setShowEmojiPicker] = useState(false)
	const [message, setMessage] = useState('')

	const handleEmojiPickerHideShow = () => {
		setShowEmojiPicker(!showEmojiPicker)
	}

	const handleEmojiClick = (event: any, emojiObject: { emoji: string }) => {
 		setMessage(message + emojiObject.emoji)
	}


	return (
		<form
			className='input-container'
			css={css`
				width: 100%;
				display: flex;
				align-items: center;
				background: white;

				button {
					background: transparent;
				}

				.emojiButton {
					background-color: transparent;
					border: none;
					border-radius: 10rem;
					--bs-btn-padding-x: 0.25rem;
					--bs-btn-padding-y: 0.25rem;
					top: 0;
					right: 0;
					display: flex;
					justify-content: flex-end;
					flex-wrap: wrap;
					align-content: flex-start;
					align-items: flex-start;

					.emoji-picker-react{
						position: absolute;
						top:-350px;
					}
				}

				input {
					width: 100%;
					border: none;
					&::selection {
						background-color: #a9a9a9;
					}
					&:focus {
						outline: none;
					}
				}
			`}
			// onSubmit={(e)=>{
			// 	e.preventDefault();
			// 	{message.length>0 && 
			// 		handleSendMessage(message)
			// 		setMessage('')
			// 	}}
			>
			<input type='text' placeholder='Type something here...' value={message} onChange={(e)=>setMessage(e.target.value)} />
			<div
				className='emojiButton'
				css={css`
					background: transparent;
					border: none;
					border-radius: 10rem;
					--bs-btn-padding-x: 0.25rem;
					--bs-btn-padding-y: 0.25rem;
				`}>
				<VscSmiley
					onClick={handleEmojiPickerHideShow}
					css={css`
						color: grey;
						font-size: 1.5rem;
					`}
				/>
				{showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} disableSearchBar={true} />}
			</div>
			<button className='submit'> send </button>
		</form>
	)
}

export default ChatInput
