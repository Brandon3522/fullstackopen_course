// Print all console.log messages

// Print normal messages
const info = (...params) => {
	console.log(...params);
}

// Print error messages
const error = (...params) => {
	console.error(...params);
}

module.exports = {
  info, error
}