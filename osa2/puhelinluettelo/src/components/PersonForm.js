import React, { useState } from 'react'

const PersonForm = (props) => {
	const { persons, setPersons, personService } = props

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
		const fp = persons.find(p => p.name === newPerson.name)
		if (fp) {
			if (!window.confirm(`Person ${newPerson.name} already in phonebook! Replace the number with this new one?`)) {
			       return
			}
			personService.update(fp.id, {...fp, number: newPerson.number}).then((resp) => {
				console.log('successfully updated', resp)
				setPersons(persons.map(p => p.id !== resp.id ? p : resp))
				setNewName('')
				setNewNumber('')
			}).catch(resp => {
				console.log('failed to update', resp)
				alert(`Failed to update entry for ${fp.name}`)
				setPersons(persons.filter(p => p.id !== fp.id))
			})
		} else {
			personService.create(newPerson).then(p => {
				setPersons(persons.concat(p))
				setNewName('')
				setNewNumber('')
			})
		}
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
