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
import React, { useEffect } from 'react'
import { IoArrowBackSharp, IoNuclearOutline } from 'react-icons/io5'
import { useParams } from 'react-router'
import ChatInput from '../components/ChatInput'
import { useVirtualizer } from '@tanstack/react-virtual'
import Chats from '../components/Chats'
import MessageBubble from '../components/MessageBubble'


const ChatContainer: React.FC = () => {

	// The scrollable element for your list
	const parentRef = React.useRef<HTMLDivElement>(null) 
    // const scrollToFn: VirtualizerOptions<any, any>['scrollToFn'] =
    // React.useCallback((offset, canSmooth, instance) => {
    //   const duration = 1000
    //   const start = parentRef.current.scrollTop
    //   const startTime = (scrollingRef.current = Date.now())

	// The virtualizer
	const rowVirtualizer = useVirtualizer({
		count: 1000,
		getScrollElement: () => parentRef.current,
		estimateSize: () => 35,
	})
   
	return (
		<>
				{/* The scrollable element for your list */}
				<div
					ref={parentRef}
					style={{
						height: `100%`,
						overflow: 'auto' // Make it scroll!
					}}>
					{/* The large inner element to hold all of the items */}
					<div
						style={{
							height: `${rowVirtualizer.getTotalSize()}px`,
							width: '100%',
							position: 'relative'
						}}>
						{/* Only the visible items in the virtualizer, manually positioned to be in view */}
						{rowVirtualizer.getVirtualItems().map((virtualItem) => (
							<div
								key={virtualItem.key}
								style={{
									position: 'absolute',
									top: 0,
									left: 0,
									width: '100%',
									height: `${virtualItem.size}px`,
									transform: `translateY(${virtualItem.start}px)`
								}}>
								<MessageBubble content={virtualItem.index}/>
							</div>
						))}
					</div>
				</div>
		</>
	)
}

export default ChatContainer
