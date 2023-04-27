// Print all console.log messages

// Print normal messages
const info = (...params) => {
	if (process.env.NODE_ENV !== 'test') {
		console.log(...params);
	}
}

// Print error messages
const error = (...params) => {
	if (process.env.NODE_ENV !== 'test') {
		console.error(...params);
	}	
}

module.exports = {
  info, error
}