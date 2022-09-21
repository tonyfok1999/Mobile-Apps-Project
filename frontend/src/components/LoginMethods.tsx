/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { useState } from 'react'
import { BsLinkedin } from 'react-icons/bs'
import { FaGooglePlus } from 'react-icons/fa'
import { BsFacebook } from 'react-icons/bs'
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth'
import { useDispatch } from 'react-redux'
import { storeAccount } from '../redux/register/action'
import { useHistory } from 'react-router'
import { isPlatform } from '@ionic/core'

export default function LoginMethods() {
	if (!isPlatform('capacitor')) {
		GoogleAuth.initialize()
	}

	const dispatch = useDispatch()
	const history = useHistory()

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
			<a
				onClick={async () => {
					const userinfo = await GoogleAuth.signIn()

					const res = await fetch(
						`${process.env.REACT_APP_BACKEND_URL}/worker-auth/webGoogleLogin`,
						{
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
								Authorization: `whatever`
							},
							body: JSON.stringify({ email: userinfo.email })
						}
					)
					const fetchData = await res.json()

					if (fetchData.message) {
						dispatch(
							storeAccount({
								nickname: userinfo.familyName,
								email: userinfo.email,
								password: userinfo.email,
								phone: parseInt(userinfo.id.slice(0, 8)),
								isLocalRegister: false
							})
						)
						history.replace('/workerRegisterPageForTypeOfService')
					} else {
						localStorage.setItem('token', fetchData.access_token)
						history.replace('/tab/workerOrderPage')
					}
				}}>
				<FaGooglePlus />
			</a>
			<a>
				<BsFacebook />
			</a>
		</span>
	)
}
