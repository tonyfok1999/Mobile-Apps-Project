/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'


import React, { useState } from 'react'
import Chats from './Chats'

// export default function ChatTab() {
//   return (
//     <div>ChatTab</div>
//   )
// }

const ChatTab: React.FC = () => {
    const [key, setKey] = useState('allChats');
    return (
    <>
		<Tabs
            id='controlled-tab-example'
			defaultActiveKey={key}
            activeKey={key}
			onSelect={(k) => setKey(k!)}
			className='mb-3'
			css={css`display: flex; justify-content: center;`}
			>
			<Tab eventKey='allChats' title='全部對話' css={css`flex:1;`}>
			<Chats/>
			</Tab>
			<Tab eventKey='storedChats' title='已收藏對話' css={css`flex:1;`}>
			<Chats/>
			</Tab>
		</Tabs>
	</>
)}

export default ChatTab

