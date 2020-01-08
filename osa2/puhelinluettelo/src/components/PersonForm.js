import React, { useState } from 'react'

const PersonForm = (props) => {
	const { addPerson } = props

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
		const onSuccess = () => {
			setNewName('')
			setNewNumber('')
		}
		addPerson(newPerson, onSuccess)
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
