/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import {
	IonToolbar,
	IonButtons,
	IonTitle,
	IonContent,
	IonHeader,
	IonPage,
	IonButton,
	IonAvatar,
	IonImg,
	IonBackButton,
	IonLabel,
	IonFooter
} from '@ionic/react'
import React, { useContext, useEffect, useState } from 'react'
import { IoArrowBackSharp, IoNuclearOutline } from 'react-icons/io5'
import { useParams } from 'react-router'
import ChatInput from '../components/ChatInput'
import { useVirtualizer } from '@tanstack/react-virtual'
import Chats from '../components/Chats'
import MessageBubble from '../components/MessageBubble'
import { WebSocketContext } from '../context/WebScoketContext'

const VirtualScroll = require('react-dynamic-virtual-scroll')

export interface Message {
	sender_id: number
	text?: string
	created_at?: Date
}

const ChatContainer: React.FC = () => {
	// The scrollable element for your list
	const parentRef = React.useRef<HTMLDivElement>(null)

	const initialState: Message = { sender_id: 0, text: 'null' }

	const [messages, setMessages] = useState<Message[]>([initialState])

	const socket = useContext(WebSocketContext)

	useEffect(() => {
		const getMessages = async () => {
			const res = await fetch(
				`${process.env.REACT_APP_BACKEND_URL}/chatroom/1/message`
			)
			const json = await res.json()
			console.log(json)
			console.log('calling getMessages')
			setMessages(() => json)
		}

		getMessages()

		console.log('container lifecycle starting')

		// socket.on('connect', ()=>{
		// 	console.log('socket connected')
		// 	getMessages()
		// })

		socket.on('onMessage', (data)=>{
			console.log('onMessage event received')
			console.log(data)
			setMessages((prev) => [...prev, data])
		})

		return () => {
			console.log('Unregistering Event')
			socket.off('connect')
			socket.off('onMessage')
		}

	}, [])

	console.log(`message: ` + JSON.stringify(messages))
	
	// const scrollToFn: VirtualizerOptions<any, any>['scrollToFn'] =
	// React.useCallback((offset, canSmooth, instance) => {
	//   const duration = 1000
	//   const start = parentRef.current.scrollTop
	//   const startTime = (scrollingRef.current = Date.now())

	// The virtualizer
	const rowVirtualizer = useVirtualizer({
		count: 1000,
		getScrollElement: () => parentRef.current,
		estimateSize: () => 50
	})

	return (
		<>
			<div
				ref={parentRef}
				style={{
					height: `100%`,
					overflow: 'auto' // Make it scroll!
				}}>
				<div
					style={{
						height: `${rowVirtualizer.getTotalSize()}px`,
						width: '100%',
						position: 'relative'
					}}>
					{rowVirtualizer.getVirtualItems().map((virtualItem) => (
						<div
							key={virtualItem.key}
							ref={virtualItem.measureElement}
							style={{
								position: 'absolute',
								top: 0,
								left: 0,
								width: '100%',
								height: `${virtualItem.size}px`,
								transform: `translateY(${virtualItem.start}px)`
							}}>
							<MessageBubble
								content={messages[virtualItem.index]}
							/>
						</div>
					))}
				</div>
			</div>

			{/* <VirtualScroll
				className='List'
				minItemHeight={40}
				totalLength={100}
				renderItem={(rowIndex: number) => {
					return (
						<div className='List-item'>
							<h3>List item: {rowIndex}</h3>
						</div>
					)
				}}
			/> */}
		</>
	)
}

export default ChatContainer
