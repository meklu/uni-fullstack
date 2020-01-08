import React, { useState } from 'react'

const PersonForm = (props) => {
	const { persons, setPersons } = props

	const [ newName, setNewName ] = useState('')
	const [ newNumber, setNewNumber ] = useState('')

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

	return (
		<form onSubmit={personAdded}>
			<div>
				<p>name: <input value={newName} onChange={nameEdited} /></p>
				<p>number: <input value={newNumber} onChange={numberEdited} /></p>
			</div>
			<div>
				<button type="submit">add</button>
			</div>
		</form>
	)
}

export default PersonForm
