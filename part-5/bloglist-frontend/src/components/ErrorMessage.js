import React from 'react'
import './errorMessage.css'

const ErrorMessage = ({message}) => {
	if (message === null) {
		return null;
	}

	return (
		<div className='errorMessage'>{message}</div>
	)
}

export default ErrorMessage