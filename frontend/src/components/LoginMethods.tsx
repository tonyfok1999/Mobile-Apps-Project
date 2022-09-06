/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React from 'react'
import { BsLinkedin } from 'react-icons/bs'
import { FaGooglePlus } from 'react-icons/fa'
import { BsFacebook } from 'react-icons/bs'

export default function LoginMethods() {
	return (
		<span
			css={css`
				display: flex;
				margin: auto;
				margin-top: 1rem;
				a {
					margin: 0 1rem 0 1rem;
					:nth-of-type(1) {
						color: #007ab9;
					}
					:nth-of-type(2) {
						color: #dc4e41;
					}
					:nth-of-type(3) {
						color: #3b5998;
					}
				}

				svg {
					border-radius: 50%;
					font-size: 30px;
				}
			`}>
			<a>
				<BsLinkedin />
			</a>
			<a>
				<FaGooglePlus />
			</a>
			<a>
				<BsFacebook />
			</a>
		</span>
	)
}
