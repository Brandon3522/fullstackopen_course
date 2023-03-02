// import './App.css';
import { useState } from 'react';

function Hello(props) {
  return (
    <div>
      <p>
        {' '}
        Hello {props.name}, you are {props.age}{' '}
      </p>
    </div>
  );
}

// ########### COURSE ###########
function Header({ course }) {
  return (
    <>
      <h1>{course}</h1>
    </>
  );
}

function Content(props) {
  return (
    <>
      <Part part1={props.parts[0].name} exercises1={props.parts[0].exercises} />
      <Part part2={props.parts[1].name} exercises2={props.parts[1].exercises} />
      <Part part3={props.parts[2].name} exercises3={props.parts[2].exercises} />
    </>
  );
}

function Part(props) {
  return (
    <>
      <p>
        {props.part1} {props.exercises1}
      </p>
      <p>
        {props.part2} {props.exercises2}
      </p>
      <p>
        {props.part3} {props.exercises3}
      </p>
    </>
  );
}

function Total({ parts }) {
  return (
    <>
      <p>
        Number of exercises{' '}
        {parts[0].exercises + parts[1].exercises + parts[2].exercises}
      </p>
    </>
  );
}
// ########### END COURSE ###########

// ########### COUNTER ###########
const Display = ({ counter }) => {
  return <>Counter: {counter}</>;
};

const Button = ({ handleClick, text }) => {
  return (
    <>
      <button onClick={handleClick}>{text}</button>
    </>
  );
};

// ########### END COUNTER ###########

// ########### PART 1 EXERCISE 1.6 - 1.14 ###########
const StatisticsLine = ({ text, value }) => {
  return (
    <>
      <tr>
        <td>{text}:</td>
        <td>{value}</td>
      </tr>
    </>
  );
};

const Statistics = ({ good, bad, neutral }) => {
  const total = good + bad + neutral;
  const average = total / 3;
  const positive = ((good / total) * 100).toFixed(2);

  if (total === 0) {
    return (
      <>
        <p>No feedback given</p>
      </>
    );
  }

  return (
    <>
      <table>
        <tbody>
          <StatisticsLine text={'Good'} value={good} />
          <StatisticsLine text={'Neutral'} value={neutral} />
          <StatisticsLine text={'Bad'} value={bad} />
          <StatisticsLine text={'Total'} value={total} />
          <StatisticsLine text={'Average'} value={average} />
          <StatisticsLine text={'Positive'} value={positive} />
        </tbody>
      </table>
    </>
  );
};

const AnecdoteVotes = ({votes, selected, anecdotes}) => {
	return (
		<>
			<p>{anecdotes[selected]}</p>
			<p>has {votes[selected]} votes.</p>
		</>
	)
}

const MaxVotes = ({votes, anecdotes}) => {
	let max = Math.max(...votes) // Get max
	console.log(max)
	let index = votes.indexOf(max) // Get index at max
	let maxVotes = anecdotes[index] // Get anecdote with max votes

	if (max < 1 || max === null || max === undefined) {
		return (
			<>
				<p>No vote has been selected.</p>
			</>
		)
	}

	return (
		<>
			<h1>Anecdote with the most votes</h1>
			<p>{maxVotes} has {max} votes</p>
		</>
	)
}

// ########### END PART 1 EXERCISE 1.6 - 1.14 ###########

function App() {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
    ],
  };

	// Anecdotes
	const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  // useState example
  const [counter, setCounter] = useState(0);
  console.log('rendering with counter value', counter);

  // ########### PART 1 EXERCISE 1.6 - 1.14 ###########
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

	// Anecdotes
	const [selected, setSelected] = useState(0);
	const [votes, setVotes] = useState(Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf,0));


  // ########### END PART 1 EXERCISE 1.6 - 1.14 ###########

  // 2 args: function ref / code, delay
  //setTimeout (() => setCounter(counter + 1), 1000)
  // test
  //console.log('rendering...', counter)

  /*
	///////////////// Functions without parameters /////////////////
  const incrementCounter = () => {
		console.log('increasing, value before', counter)
    setCounter(counter + 1);
  };
  const decrementCounter = () => {
		console.log('decreasing, value before', counter)
    setCounter(counter - 1);
  };

  const resetCounter = () => {
		console.log('resetting to zero, value before', counter)
    setCounter(0);
  };
	*/

  const setToValue = (newCounter) => {
    setCounter(newCounter);
  };

	const getRandomInt = (min, max) => {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min) + min);
	}

	const selectedAnecdote = () => {
		setSelected(getRandomInt(0, anecdotes.length))
	}

	const calculateVotes = () => {
		console.log(votes)
		const votesCopy = [...votes]

		votesCopy[selected] += 1
		console.log(votesCopy)

		setVotes(votesCopy)
	}

  return (
    <>
      {/* COURSE */}
      <Header course={course['name']} />

      <Hello name="Bob" age={12} />

      <Content parts={course['parts']} />

      <Total parts={course['parts']} />

      {/* COUNTER */}
      <Display counter={counter} />
      <br />
      <Button text={'+'} handleClick={() => setToValue(counter + 1)}></Button>
      <Button text={'-'} handleClick={() => setToValue(counter - 1)}></Button>
      <br />
      <br />
      <Button text={'Reset'} handleClick={() => setToValue(0)}></Button>
      <br />
      <br />

      {/* PART 1 Exercises 1.6 - 1.14 */}
      <h1>Give Feedback</h1>
      <Button text={'Good'} handleClick={() => setGood(good + 1)} />
      <Button text={'Neutral'} handleClick={() => setNeutral(neutral + 1)} />
      <Button text={'Bad'} handleClick={() => setBad(bad + 1)} />

      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
			<br />

			{/* Anecdotes */}
			<h1>Anecdotes</h1>
			<AnecdoteVotes anecdotes={anecdotes} votes={votes} selected={selected} />
			<Button text={'Vote'} handleClick={calculateVotes}></Button>
			<Button text={'Next Anecdote'} handleClick={selectedAnecdote} />

			<MaxVotes anecdotes={anecdotes} votes={votes} />
			
    </>
  );
}

export default App;
