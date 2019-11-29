import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Heading = ({text}) => <h1>{text}</h1>

const Button = ({text, onClick}) => {
	return (
		<button onClick={onClick}>{text}</button>
	)
}

const Feedback = ({feedback, setFeedback}) => {
	const fbKeys = Object.keys(feedback)
	return [
		<Heading key="fbhead" text="give feedback" />
	].concat(fbKeys.map((k) => {
		const onClick = () => {
			let fbCopy = {...feedback}
			fbCopy[k] = fbCopy[k] + 1
			setFeedback(fbCopy)
		}
		return ( <Button key={'btn_' + k} text={k} onClick={onClick} /> )
	}))
}

const Statistic = ({text, value}) => <p>{text} {value}</p>

const Stats = ({feedback}) => {
	const fbKeys = Object.keys(feedback)
	const worth = {
		good: 1,
		neutral: 0,
		bad: -1
	}
	const all = fbKeys.map((k) => feedback[k]).reduce((a, b) => a + b, 0)
	const average = fbKeys.map((k) => feedback[k] * worth[k]).reduce((a, b) => a + b, 0) / all
	const positive = (100 * feedback.good / all) + " %"
	const stats = {
		...feedback,
		all: all,
		average: average,
		positive: positive
	}
	const statKeys = Object.keys(stats)
	const head = [
		<Heading key="stathead" text="statistics" />
	]
	if (all > 0) {
		return head.concat(statKeys.map((k) => <Statistic key={'stat_' + k} text={k} value={stats[k]} />))
	} else {
		return head.concat([<p key="stat_empty">No feedback given</p>])
	}
}

const App = () => {
	const [feedback, setFeedback] = useState({
		good: 0,
		neutral: 0,
		bad: 0
	})
        return (
                <div>
			<Feedback feedback={feedback} setFeedback={setFeedback} />
			<Stats feedback={feedback} />
                </div>
        )
}

ReactDOM.render(<App />, document.getElementById('root'))
