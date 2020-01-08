import React from 'react'

const Search = (props) => {
	const { search, setSearch } = props

	const searchEdited = (e) => {
		setSearch(e.target.value)
	}

	return (
		<p>filter names with: <input value={search} onChange={searchEdited} /></p>
	)
}

export default Search
