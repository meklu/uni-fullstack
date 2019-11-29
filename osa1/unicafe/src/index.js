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

const Stats = ({feedback}) => {
	return [
		<Heading key="stathead" text="statistics" />
	].concat(Object.keys(feedback).map((k) => <p key={'stat_' + k}>{k} {feedback[k]}</p>))
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
