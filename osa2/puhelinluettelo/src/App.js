import React, { useState } from 'react'

import Person from './components/Person'

const App = (props) => {
	const [ persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: 112 }
	])
	const [ search, setSearch ] = useState('')
	const [ newName, setNewName ] = useState('')
	const [ newNumber, setNewNumber ] = useState('')

	const searchEdited = (e) => {
		setSearch(e.target.value)
	}
	const nameEdited = (e) => {
		setNewName(e.target.value)
	}
	const numberEdited = (e) => {
		setNewNumber(e.target.value)
	}

	const personAdded = (e) => {
		e.preventDefault()
		const newPerson = {
			name: newName,
			number: newNumber
		}
		let fail = false
		if (newPerson.name === '') {
			alert("Name can't be empty!")
			fail = true
		}
		if (!/^\+?[0-9-]+$/.test(newPerson.number)) {
			alert("Enter a valid number!")
			fail = true
		}
		if (fail) {
			return
		}
		if (persons.map(p => p.name).includes(newPerson.name)) {
			alert(`Person ${newPerson.name} already in phonebook!`)
			return
		}
		setPersons(persons.concat(newPerson))
		setNewName('')
		setNewNumber('')
	}

	const personsShown = (search === '')
		? persons
		: persons.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))

	return (
		<div>
			<h2>Phonebook</h2>
			<p>filter names with: <input value={search} onChange={searchEdited} /></p>
			<h3>Add new</h3>
			<form onSubmit={personAdded}>
				<div>
					<p>name: <input value={newName} onChange={nameEdited} /></p>
					<p>number: <input value={newNumber} onChange={numberEdited} /></p>
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			{personsShown.map(p => <Person key={p.name} person={p} />)}
		</div>
       )
}

export default App
