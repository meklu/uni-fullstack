import React, { useState, useEffect } from 'react'

import personService from './services/personService'

import Search from './components/Search'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

const App = () => {
	const [ persons, setPersons] = useState([])

	const [ search, setSearch ] = useState('')

	const personsShown = (search === '')
		? persons
		: persons.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))

	const deletePerson = (person) => {
		if (!window.confirm(`Are you sure you want to delete ${person.name}?`)) {
			return
		}
		console.log('deleting', person)

		const drop = () => setPersons(persons.filter(p => p.id !== person.id))

		personService.delete(person.id).then(resp => {
			console.log('deletion succeeded', resp)
			drop()
		}).catch((resp) => {
			console.log('deletion failed', resp)
			window.alert(`Failed to delete ${person.name} - no such entity`)
			drop()
		})
	}

	useEffect(() => {
		personService.getAll().then((initialP) => {
			setPersons(initialP)
		})
	}, [])

	return (
		<div>
			<h2>Phonebook</h2>
			<Search search={search} setSearch={setSearch} />
			<h3>Add new</h3>
			<PersonForm persons={persons} setPersons={setPersons} personService={personService} />
			<h2>Numbers</h2>
			<Persons persons={personsShown} deletePerson={deletePerson} />
		</div>
       )
}

export default App
