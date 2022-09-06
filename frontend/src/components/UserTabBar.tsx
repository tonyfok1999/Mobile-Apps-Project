/** @jsxImportSource @emotion/react */
import React from 'react'
import { BsFillMicFill } from 'react-icons/bs'
import { AiOutlineWechat } from 'react-icons/ai'
import { css } from '@emotion/react'

export default function DetailsOfRecordingContent() {
	return (
		<div
			className='userTabBar'
			css={css`
                /* font-size: 350%; */
                
            svg {
                display: block;
				/* flex-direction: column; */
				justify-content: space-between;
                font-size: 350%;
            }
               

			`}>
			<BsFillMicFill />
			<AiOutlineWechat />
		</div>
	)
}
