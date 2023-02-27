console.log(`Hello world`);


const numbers = [1, 2, 3, 4, 5];

// For each loop
numbers.forEach(value => {
	console.log(value)
})

// Map creates a new array with each value multiplied by 2
const map_test = numbers.map(value => value * 2)
console.log(`###################`)

map_test.forEach(value => console.log(value))

