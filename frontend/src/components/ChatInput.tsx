/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { VscSmiley } from 'react-icons/vsc'
import React, { useContext, useEffect, useState } from 'react'
import Picker from 'emoji-picker-react'
import { useParams } from 'react-router'
import { useAppSelector } from '../store'
import { useIonAlert } from '@ionic/react'
import SocketContext from '../socket/SocketContext'
import { IoMdSend } from 'react-icons/io'

export interface Message {
	chatroom_id?: number
	sender_id: number
	text?: string
}

const ChatInput: React.FC = () => {
	const [showEmojiPicker, setShowEmojiPicker] = useState(false)
	const [message, setMessage] = useState('')

	const params = useParams<{ chatroomId: string }>()
	const chatroomId = parseInt(params.chatroomId)
	const userId = useAppSelector((state) => state.auth.user!.id)
	const textareaRef =
		React.useRef() as React.MutableRefObject<HTMLTextAreaElement>
	const [pickerRef, setPickerRef] = React.useState<HTMLDivElement | null>(
		null
	)

	const { socket } = useContext(SocketContext)

	useEffect(() => {
		const closePicker = (e: any) => {
			setShowEmojiPicker(() => false)
			console.log('clicked outside')
		}

		pickerRef?.addEventListener('mousedown', (event) => {
			event.stopPropagation()
		})

		document.body.addEventListener('mousedown', closePicker)

		return () => {
			document.body.removeEventListener('mousedown', closePicker)
			pickerRef?.removeEventListener('mousedown', (event) => {
				event.stopPropagation()
			})
		}
	}, [pickerRef, setShowEmojiPicker])

	const handleEmojiPickerHideShow = (e: any) => {
		setShowEmojiPicker(() => true)
		console.log('handleEmojiPickerHideShow ' + showEmojiPicker)
	}

	const handleEmojiClick = (event: any, emojiObject: { emoji: string }) => {
		setMessage(message + emojiObject.emoji)
	}

	const handleFormSubmit = (event: any) => {
		event.preventDefault()

		if (message.length > 0) {
			socket?.emit('newMessage', {
				chatroom_id: chatroomId,
				sender_id: userId,
				text: message
			})

			socket?.emit('setChatroom', chatroomId)

			console.log(`the message ${message} has been submit`)
			setMessage('')
			textareaRef.current.style.height = 'auto'
		}
	}

	return (
		<form
			key='input-container'
			css={css`
				width: 100%;
				display: flex;
				align-items: flex-end;
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

					.emoji-picker-react {
						position: absolute;
						top: -350px;
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

				label .text-input textarea {
					width: 100%;
				}
			`}
			onSubmit={(e) => handleFormSubmit(e)}>
			<label
				className='text-input'
				css={css`
					width: 100%;
				`}>
				<textarea
					rows={1}
					ref={textareaRef}
					css={css`
						width: 100%;
						border: none;
						resize: none;
						max-height: 6.5rem;
						:focus-visible {
							outline: none;
						}
					`}
					key='textarea'
					role='textbox'
					placeholder='Type something here...'
					form='input-container'
					value={message}
					onChange={(e) => {
						e.target.style.height = 'auto'
						setMessage(e.target.value)
						e.target.style.height = e.target.scrollHeight + 'px'
					}}
				/>
			</label>
			<div
				className='emojiButton'
				ref={(el) => setPickerRef(el)}
				onClick={(e) => handleEmojiPickerHideShow(e)}
				css={css`
					background: transparent;
					border: none;
					border-radius: 10rem;
					--bs-btn-padding-x: 0.25rem;
					--bs-btn-padding-y: 0.25rem;
				`}>
				<VscSmiley
					css={css`
						color: grey;
						font-size: 1.5rem;
						margin-right: 0.5rem;
						:active {
							color: #3b1599;
							outline: none;
						}
					`}
				/>
				{showEmojiPicker && (
					<Picker
						onEmojiClick={handleEmojiClick}
						disableSearchBar={true}
					/>
				)}
			</div>
			<button type='submit'>
				<IoMdSend
					size={'1.5rem'}
					css={css`
						color: grey;
						:active {
							color: #3b1599;
						}
					`}
				/>
			</button>
		</form>
	)
}

export default ChatInput
