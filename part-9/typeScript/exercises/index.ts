import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

// const qs = require('qs');
const app = express();

app.use(express.json());

app.get('/hello', (_request, response) => {
  response.send('Hello full stack');
});

// http://localhost:3003/bmi?height=180&weight=72
app.get('/bmi', (_request, response) => {
  try {
    // Throw error if query params are wrong type or missing
    if (
      _request.query.height instanceof String ||
      _request.query.weight instanceof String ||
      _request.query.height === '' ||
      _request.query.weight === '' ||
      _request.query.height === undefined ||
      _request.query.weight === undefined
    ) {
      //console.log(`Error: ${!isNaN(Number(_request.query.height))}, ${typeof _request.query.height}`)
      console.log(`Types: ${_request.query.height}`);
      throw new Error('Malformatted query params');
    }

    //console.log(`Types: ${_request.query.height}`);

    const height = Number(_request.query.height);
    const weight = Number(_request.query.weight);
    const bmi = calculateBmi(height, weight);

    const result = {
      weight: weight,
      height: height,
      bmi: bmi,
    };

    response.send(result).status(200);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      response.status(400).json({ error: error.message });
    }
  }
});

app.post('/exercises', (_request, response) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = _request.body;

	let result0 = daily_exercises.every((value: any) => {
		console.log(`Daily exercises: ${typeof value}`)
		return typeof value !== 'number';
	})

	console.log(`Result-0: ${result0}`)
	
	// eslint-disable-next-line @typescript-eslint/no-unsafe-parameter-value
	const isNumbers = daily_exercises.every((value: any) => {
		if (typeof value !== 'number') {
			return true;
		} else return false;
	})

  // Validate input
  if (!daily_exercises || !target) {
    return response.json({ error: 'Parameters missing' }).status(400);
  } else if (
    isNaN(target) || isNumbers
  ) {
    return response.json({ error: 'Malformatted parameters' }).status(400);
  }

  // Calculate result
  const result = calculateExercises(daily_exercises, Number(target));

  return response.send(result).status(200);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
