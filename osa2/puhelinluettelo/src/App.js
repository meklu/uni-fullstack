import React, { useState } from 'react'

import Person from './components/Person'

const App = (props) => {
	const [ persons, setPersons] = useState([
		{ name: 'Arto Hellas' }
	])
	const [ newName, setNewName ] = useState('')

	const nameEdited = (e) => {
		setNewName(e.target.value)
	}

	const personAdded = (e) => {
		e.preventDefault()
		const newPerson = {
			name: newName
		}
		if (persons.map(p => p.name).includes(newPerson.name)) {
			alert(`Person ${newPerson.name} already in phonebook!`)
			return
		}
		setPersons(persons.concat(newPerson))
		setNewName('')
	}

	return (
		<div>
			<h2>Phonebook</h2>
			<form onSubmit={personAdded}>
				<div>
					name: <input value={newName} onChange={nameEdited} />
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			{persons.map(p => <Person key={p.name} person={p} />)}
		</div>
       )
}

export default App
