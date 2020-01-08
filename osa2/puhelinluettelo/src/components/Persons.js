import React from 'react'

import Person from './Person'

const Persons = (props) => {
	const { persons } = props
	return persons.map(p => <Person key={p.id} person={p} />)
}

export default Persons
