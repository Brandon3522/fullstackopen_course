// Define specific inputs for calculator
type Operation = 'multiply' | 'add' | 'divide';

const calculator = (a: number, b: number, op: Operation): number | string => {
  switch (op) {
    case 'multiply':
      return a * b;
    case 'add':
      return a + b;
    case 'divide':
      if (b === 0) {
        throw new Error("Can't divide by 0!");
      }
      return a / b;
    default:
      throw new Error('Invalid operation!');
  }
};

try {
  let calc_result = calculator(1, 5, 'divide');
  console.log(calc_result);
} catch (error) {
  let errorMessage = 'Error: ';
	// Narrow the type to access the field
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}