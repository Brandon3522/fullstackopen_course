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
const DisplayFeedback = ({feedback, feedbackName}) => {
	return (
		<>
			<p>{feedbackName}: {feedback}</p>
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

  // useState example
  const [counter, setCounter] = useState(0);
  console.log('rendering with counter value', counter);

	// ########### PART 1 EXERCISE 1.6 - 1.14 ###########
	const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)




 // ########### END PART 1 EXERCISE 1.6 - 1.14 ###########

  // 2 args: function ref / code, delay
  //setTimeout (() => setCounter(counter + 1), 1000)
  // test
  //console.log('rendering...', counter)

	/*
	// Functions without parameters
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
		setCounter(newCounter)
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
			<DisplayFeedback feedbackName={'good'} feedback={good}  />
			<DisplayFeedback feedbackName={'neutral'} feedback={neutral}  />
			<DisplayFeedback feedbackName={'bad'} feedback={bad}  />



    </>
  );
}

export default App;
