import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => <h1>{props.course.name}</h1>

const Part = (props) => <p>{props.name} {props.exercises}</p>

const Content = (props) => {
	return props.parts.map(p => <Part name={p.name} exercises={p.exercises} />)
}

const Total = (props) => {
	const num = props.parts.map(p => p.exercises).reduce((a, b) => a + b, 0)
	return ( <p>Number of exercises {num}</p> )
}

const App = () => {
	const course = {
		name: 'Half Stack application development',
		parts: [
			{name: 'Fundamentals of React', exercises: 10},
			{name: 'Using props to pass data', exercises: 7},
			{name: 'State of a component', exercises: 14}
		]
	}

	return (
		<div>
			<Header course={course} />
			<Content parts={course.parts} />
			<Total parts={course.parts} />
		</div>
	)
}

ReactDOM.render(<App />, document.getElementById('root'))
