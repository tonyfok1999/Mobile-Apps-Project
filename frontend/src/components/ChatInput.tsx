/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { VscSmiley } from 'react-icons/vsc'
import React, { useContext, useEffect, useRef, useState } from 'react'
import Picker from 'emoji-picker-react'

import { WebSocketContext } from '../context/WebScoketContext'
import { useParams } from 'react-router'
import { useAppSelector } from '../store'
import { useIonAlert } from '@ionic/react'
import { useSocket } from '../hooks/useSocket'
import SocketContext from '../socket/SocketContext'
import Button from 'react-bootstrap/Button'
import { IoMdSend } from 'react-icons/io'

export interface Message {
	chatroom_id?: number
	sender_id: number
	text?: string
}

const ChatInput: React.FC = () => {
	const [showEmojiPicker, setShowEmojiPicker] = useState(false)
	const [message, setMessage] = useState('')

	// const socket = useContext(WebSocketContext)
	const params = useParams<{ chatroomId: string }>()
	const chatroomId = parseInt(params.chatroomId)
	const userId = useAppSelector((state) => state.auth.user!.id)
	const textareaRef =
		React.useRef() as React.MutableRefObject<HTMLTextAreaElement>
	const pickerRef = React.useRef() as React.MutableRefObject<HTMLDivElement>
	const [presentAlert] = useIonAlert()
	const { socket } = useContext(SocketContext)

	useEffect(() => {
		const closePicker = (e: any) => {
			console.log(e.path[0].tagName)
			console.dir(pickerRef.current, {depth: 3})
			// if (!pickerRef.current.contains(e.target.path[0].tagName)) {
			if(e.path[0].tagName === 'UL' || e.path[0].tagName === 'BUTTON' || e.path[0].tagName ==='IMG' ){
				setShowEmojiPicker(()=>true)
				console.log(showEmojiPicker)
				console.log('clicked inside')
				return
			}
		// 	else if (e.path[0].tagName !== 'svg.css-1f1bq7v-ChatInput'){
			setShowEmojiPicker(()=>false)
			console.log(showEmojiPicker)
			console.log('clicked outside')
		// }
	}

		// pickerRef.current?.addEventListener('mousedown', (event) => { event.stopPropagation(); });

		document.body.addEventListener('mousedown', closePicker)

		return () => {
			document.body.removeEventListener('mousedown', closePicker)
		}
	}, [])

	// useEffect(() => {
	// 	const onMessage =() => {

	// 	}
	// 	socket?.on('', onMessage);

	// 	return () => {
	// 		socket?.off('', onMessage)
	// 	}
	// }, [socket]

	// useEffect(() => {

	// 	socket.on('connect', ()=>{
	// 		console.log('Connected')
	// 	})

	// 	return () => {
	// 		console.log('Unregistering Event')
	// 		socket.off('connect')
	// 		socket.off('onMessage')
	// 	}
	// }, [])

	const handleEmojiPickerHideShow = (e: any) => {
		setShowEmojiPicker(() => true)
		console.log('handleEmojiPickerHideShow ' + showEmojiPicker)
	}

	const handleEmojiClick = (event: any, emojiObject: { emoji: string }) => {
		setMessage(message + emojiObject.emoji)
	}

	const token = localStorage.getItem('token')

	const handleSendMessage = async (message: string, formData: FormData) => {
		// const blob = new Blob(
		// 	[JSON.stringify({ sender_id: 1, text: message })],
		// 	{ type: 'application/json' }
		// )
		// formData.append('blob', blob)

		// const res = await fetch(
		// 	`${process.env.REACT_APP_BACKEND_URL}/chatroom/${chatroomId}/message`,
		// 	{
		// 		method: 'POST',
		// 		headers: {
		// 			'Content-Type': 'application/json; charset=utf-8',
		// 			Authorization: `Bearer ${token}`
		// 		},
		// 		body: JSON.stringify({ sender_id: userId, text: message })
		// 	}
		// )
		console.log('message has been sent')

		// if (res.status === 400) {
		// 	presentAlert({
		// 		header: '訊息錯誤',
		// 		message: '聊天室已被刪除',
		// 		buttons: ['確定']
		// 	})
		// }
	}

	const handleFormSubmit = (event: any) => {
		event.preventDefault()
		let form = event.currentTarget
		let formData = new FormData(form)

		if (message.length > 0) {
			console.log(formData)
			handleSendMessage(message, formData)
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
			{/* <input type='text'		
			placeholder='Type something here...' value={message} 
			onChange={(e)=>setMessage(e.target.value)} /> */}
			<div
				className='emojiButton'
				ref={pickerRef}
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
			{/*<Button type='submit'>*/}
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
			{/*</Button>*/}
		</form>
	)
}

export default ChatInput
