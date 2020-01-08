import React from 'react'

import Course from './Course'

const Courses = (props) => {
	const { courses } = props
	return courses.map(c => <Course course={c} />)
}

export default Courses
