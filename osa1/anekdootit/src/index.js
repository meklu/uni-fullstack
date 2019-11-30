import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Button = ({text, onClick}) => <button onClick={onClick}>{text}</button>

const Anecdote = ({text, points}) => <div><p>{text}</p><p>has {points} votes</p></div>

const App = (props) => {
	const [selected, setSelected] = useState(0)
	const [points, setPoints] = useState(new Array(props.anecdotes.length).fill(0))
	const [maxP, setMaxP] = useState({idx: 0, pts: 0})
	const randomAnecdote = () => setSelected(Math.floor(Math.random() * props.anecdotes.length))
	const upvote = () => {
		const cpnts = [...points]
		cpnts[selected] += 1
		if (cpnts[selected] > maxP.pts) {
			setMaxP({idx: selected, pts: cpnts[selected]})
		}
		setPoints(cpnts)
	}

	return (
		<div>
			<h1>Anecdote of the day</h1>
			<Anecdote text={props.anecdotes[selected]} points={points[selected]} />
			<Button text="vote" onClick={upvote} />
			<Button text="next anecdote" onClick={randomAnecdote} />
			<h1>Anecdote with the most votes</h1>
			<Anecdote text={props.anecdotes[maxP.idx]} points={maxP.pts} />
		</div>
       )
}

const anecdotes = [
	'If it hurts, do it more often',
	'Adding manpower to a late software project makes it later!',
	'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
	'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
	'Premature optimization is the root of all evil.',
	'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
	<App anecdotes={anecdotes} />,
	document.getElementById('root')
)
