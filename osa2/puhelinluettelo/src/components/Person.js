import React from 'react'

const Person = (props) => {
	const { person, deletePerson } = props

	return (
		<p>{person.name}: {person.number} <button onClick={() => deletePerson(person)}>delete</button></p>
	)
}

export default Person
