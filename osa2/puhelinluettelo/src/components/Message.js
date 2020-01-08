import React from 'react'

const Message = (props) => {
	const { message } = props
	if (message === null) {
		return null
	}
	const { msg, succ } = message
	return (
		<div className={`msg ${succ ? 'good' : 'bad'}`}>{msg}</div>
	)
}

export default Message
