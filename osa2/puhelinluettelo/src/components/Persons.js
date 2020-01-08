import React from 'react'

import Person from './Person'

const Persons = (props) => {
	const { persons, deletePerson } = props
	return persons.map(p => <Person key={p.id} person={p} deletePerson={deletePerson} />)
}

export default Persons
