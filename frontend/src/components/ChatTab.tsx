

import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'


import React, { useState } from 'react'
import UncontrolledExample from './UncontrolledExample'

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
			className='mb-3'>
			<Tab eventKey='allChats' title='全部對話'>
			<UncontrolledExample/>
			</Tab>
			<Tab eventKey='storedChats' title='已收藏對話'>
			<UncontrolledExample/>
			</Tab>
		</Tabs>
	</>
)}

export default ChatTab

