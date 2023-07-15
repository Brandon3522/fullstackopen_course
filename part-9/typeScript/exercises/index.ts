import express from 'express';
import { calculateBmi } from './bmiCalculator';

// const qs = require('qs');
const app = express();

app.get('/hello', (_request, response) => {
  response.send('Hello full stack');
});

// http://localhost:3003/bmi?height=180&weight=72
app.get('/bmi', (_request, response) => {
  try {
    // Throw error if query params are wrong type or missing
    if (
      _request.query.height instanceof String ||
      _request.query.weight instanceof String
    ) {
      //console.log(`Error: ${!isNaN(Number(_request.query.height))}, ${typeof _request.query.height}`)
      throw new Error('Malformatted query params');
    }

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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
