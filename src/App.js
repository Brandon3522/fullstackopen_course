// import './App.css';

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

function Header({ course }) {
	console.log(course);
  return (
    <>
      <h1>{course}</h1>
    </>
  );
}

function Content(props) {
	console.log(props);
  return (
    <>
      <Part part1={props.parts[0].name} exercises1={props.parts[0].exercises}/>
			<Part part2={props.parts[1].name} exercises2={props.parts[1].exercises}/>
			<Part part3={props.parts[2].name} exercises3={props.parts[2].exercises}/>
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
	)
}



function Total({parts}) {
	console.log(parts)
  return (
		<>
			<p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>
		</>
	)
}

function App() {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <>
      <Header course={course['name']} />

			<Hello name='Bob' age={12}/>

      <Content parts={course['parts']}/>
      
			<Total parts={course['parts']}/>
    </>
  );
}

export default App;
