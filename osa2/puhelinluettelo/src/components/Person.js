import React from 'react'

const Person = (props) => {
	const { person } = props
	return (
		<p>{person.name}</p>
	)
}

export default Person
