import React from 'react'
import { NavLink } from 'react-router-dom'
import LoginBox from '../components/LoginBox'
import Logo from '../components/Logo'

export default function WorkerLoginPage() {
	return (
		<>
			<Logo />
			<LoginBox />
			<div>
				師傅想加入我們?<NavLink to=''></NavLink>
			</div>
		</>
	)
}
