import React from 'react'
import { NavLink } from 'react-router-dom'
import LoginBox from '../components/LoginBox'
import Logo from '../components/Logo'

export default function WorkerLoginPage() {
	return (
		<>
			<Logo />
			<LoginBox />
			<NavLink to='/workerLogin'>師傅想加入我們?</NavLink>
		</>
	)
}
