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

	const notify = (msg, succ) => {
		setMessage({msg, succ})
		setTimeout(() => setMessage(null), 5000)
	}

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
		}).catch((err) => {
			let emsg = err.response.data.error || 'unknown error'
			console.log('deletion failed', err.response.data)
			notify(emsg, false)
			drop()
		})
	}

	const addPerson = (newPerson, onSuccess) => {
		let fail = []
		if (newPerson.name.length < 3) {
			fail = fail.concat("Name must be at least 3 characters long!")
		}
		if (newPerson.number.length < 8 || !/^\+?[0-9-]+$/.test(newPerson.number)) {
			fail = fail.concat("Enter a valid number!")
		}
		if (fail.length > 0) {
			notify(fail.join('\n'), false)
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
			}).catch(err => {
				let emsg = err.response.data.error || 'unknown error'
				console.log('failed to update', err.response.data)
				notify(emsg, false)
				setPersons(persons.filter(p => p.id !== fp.id))
			})
		} else {
			personService.create(newPerson).then(p => {
				notify(`Successfully added ${newPerson.name}`, true)
				setPersons(persons.concat(p))
				onSuccess()
			}).catch(err => {
				let emsg = err.response.data.error || 'unknown error'
				console.log('failed to create', err.response.data)
				notify(emsg, false)
			})
		}
	}

	useEffect(() => {
		personService.getAll().then((initialP) => {
			setPersons(initialP)
		}).catch(err  => {
			let emsg = err.response.data.error || 'unknown error'
			notify(emsg, false)
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
