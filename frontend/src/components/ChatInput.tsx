/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { VscSmiley } from 'react-icons/vsc'
import Button from 'react-bootstrap/Button'
import React, { useEffect, useState } from 'react'
import Picker from 'emoji-picker-react'
import { async } from 'rxjs'
import { Message } from './ChatContainer'

const ChatInput: React.FC = () => {
	const [showEmojiPicker, setShowEmojiPicker] = useState(false)
	const [message, setMessage] = useState('')

	const handleEmojiPickerHideShow = () => {
		setShowEmojiPicker(!showEmojiPicker)
	}

	const handleEmojiClick = (event: any, emojiObject: { emoji: string }) => {
 		setMessage(message + emojiObject.emoji)
	}

	const handleSendMessage =async (message: string,formData: FormData) => {
		
		const blob = new Blob([JSON.stringify({sender_id: 1, text: message})], {type : 'application/json'});
		formData.append('blob', blob)

		await fetch(
			`${process.env.REACT_APP_BACKEND_URL}/chatroom/1/message`,
			{ 
			method: 'POST',
			headers:{'Content-Type': 'application/json; charset=utf-8'},
			body: JSON.stringify({sender_id: 1, text: message})
			}
		)
		console.log('message has been sent')
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
			onSubmit={(event) => {
				event.preventDefault();
				let form = event.currentTarget
				let formData = new FormData(form)

				if(message.length>0){
					console.log(formData)
					handleSendMessage(message, formData);
					console.log('the message has been submit')
					setMessage('')
				}}
			}
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
