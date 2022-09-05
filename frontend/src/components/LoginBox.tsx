import React from 'react'
import { NavLink } from 'react-router-dom'

export default function LoginBox() {
	return (
		<div className='container'>
			<h1>登入</h1>
			<form action='#'>
				<input type='text' />
				<input type='password' />
				<NavLink to='#'>忘記密碼?</NavLink>
				<input type='submit' />
			</form>
			<div>或</div>
			<span>LinkIn</span>
			<span>Google</span>
			<span>Facebook</span>
		</div>
	)
}
