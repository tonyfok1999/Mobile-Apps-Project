import React from 'react'
import { NavLink } from 'react-router-dom'

export default function LoginBox() {
	return (
		<div className='container'>
			<h1>登入</h1>
			<form action='#'>
				<input type='text' placeholder='電郵' />
				<input type='password' placeholder='密碼' />
				<NavLink to='#'>忘記密碼?</NavLink>
				<input type='submit' />
			</form>
			<div>或</div>
			<a>LinkIn</a>
			<a>Google</a>
			<a>Facebook</a>
		</div>
	)
}
