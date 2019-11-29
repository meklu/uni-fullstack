import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => <h1>{props.course}</h1>

const Part = (props) => <p>{props.part} {props.exercises}</p>

const Content = (props) => {
	return props.parts.map(p => <Part part={p.part} exercises={p.exercises} />)
}

const Total = (props) => {
	const num = props.parts.map(p => p.exercises).reduce((a, b) => a + b, 0)
	return ( <p>Number of exercises {num}</p> )
}

const App = () => {
	const course = 'Half Stack application development'
	const parts = [
		{part: 'Fundamentals of React', exercises: 10},
		{part: 'Using props to pass data', exercises: 7},
		{part: 'State of a component', exercises: 14}
	]

	return (
		<div>
			<Header course={course} />
			<Content parts={parts} />
			<Total parts={parts} />
		</div>
	)
}

ReactDOM.render(<App />, document.getElementById('root'))
