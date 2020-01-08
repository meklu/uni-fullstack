import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Search from './components/Search'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

const App = () => {
	const [ persons, setPersons] = useState([])

	const [ search, setSearch ] = useState('')

	const personsShown = (search === '')
		? persons
		: persons.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))

	useEffect(() => {
		axios.get("http://localhost:3001/persons").then((resp) => {
			setPersons(resp.data)
		})
	}, [])

	return (
		<div>
			<h2>Phonebook</h2>
			<Search search={search} setSearch={setSearch} />
			<h3>Add new</h3>
			<PersonForm persons={persons} setPersons={setPersons} />
			<h2>Numbers</h2>
			<Persons persons={personsShown} />
		</div>
       )
}

export default App
