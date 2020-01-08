import React, { useState, useEffect } from 'react'

import personService from './services/personService'

import Message from './components/Message'
import Search from './components/Search'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

const App = () => {
	const [ persons, setPersons] = useState([])

	const [ search, setSearch ] = useState('')

	const [ message, setMessage ] = useState(null)

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
			notify(`Successfully deleted ${person.name}`, true)
			drop()
		}).catch((resp) => {
			console.log('deletion failed', resp)
			notify(`Failed to delete ${person.name} - no such entity`, false)
			drop()
		})
	}

	const notify = (msg, succ) => {
		setMessage({msg, succ})
		setTimeout(() => setMessage(null), 5000)
	}

	const addPerson = (newPerson, onSuccess) => {
		let fail = false
		let failmsg = ''
		if (newPerson.name === '') {
			failmsg = "Name can't be empty!"
			fail = true
		}
		if (!/^\+?[0-9-]+$/.test(newPerson.number)) {
			failmsg += "\nEnter a valid number!"
			fail = true
		}
		if (fail) {
			notify(failmsg, false)
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
				notify(`Successfully updated the entry for ${resp.name}`, true)
				onSuccess()
			}).catch(resp => {
				console.log('failed to update', resp)
				notify(`Failed to update entry for ${fp.name} since it's already deleted`, false)
				setPersons(persons.filter(p => p.id !== fp.id))
			})
		} else {
			personService.create(newPerson).then(p => {
				notify(`Successfully added ${newPerson.name}`, true)
				setPersons(persons.concat(p))
				onSuccess()
			})
		}
	}

	useEffect(() => {
		personService.getAll().then((initialP) => {
			setPersons(initialP)
		})
	}, [])

	return (
		<div>
			<Message message={message} />
			<h2>Phonebook</h2>
			<Search search={search} setSearch={setSearch} />
			<h3>Add new</h3>
			<PersonForm addPerson={addPerson} />
			<h2>Numbers</h2>
			<Persons persons={personsShown} deletePerson={deletePerson} />
		</div>
       )
}

export default App
