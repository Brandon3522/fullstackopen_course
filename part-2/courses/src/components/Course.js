
const Header = ({text}) => {
	return (
		<>
			<h1>{text}</h1>
		</>
	)
}

// Reduce: Inputs => accumulator: total, currentValue: part and initialValue: initial
const CourseContent = ({parts}) => {
	let initial = 0
	const sum = parts.reduce((total, part) => total += part.exercises, initial)
	
	return (
		<>
		<ul>
			{parts.map(part =>
				<li key={part.id}>
					<CoursePart part={part.name} exercises={part.exercises}/>
				</li>)}
				<h3>Total of {sum} exercises.</h3>
		</ul>
		</>
	)
}

const CoursePart = ({part, exercises}) => {
	return (
		<>
			<p>{part} {exercises}</p>
		</>
	)
}

const Course = ({name, parts}) => {
	return (
		<>
		<Header text={name}/>
		<CourseContent parts={parts} />
		</>
	)
}

export default Course