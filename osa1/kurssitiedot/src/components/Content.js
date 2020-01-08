import React from 'react'

import Part from './Part'

const Content = ({parts}) => {
	return parts.map((p, k) => <Part key={k} name={p.name} exercises={p.exercises} />)
}

export default Content
