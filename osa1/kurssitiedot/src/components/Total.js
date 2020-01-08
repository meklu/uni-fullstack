import React from 'react'

const Total = (props) => {
	const num = props.parts.map(p => p.exercises).reduce((a, b) => a + b, 0)
	return ( <p>Number of exercises {num}</p> )
}

export default Total
