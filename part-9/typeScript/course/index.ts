import express from 'express';
import { calculator, Operation } from './calculator';


const app = express();

app.use(express.json());

app.get('/ping', (_request, response) => {
  response.send('pong');
});

app.post('/calculate', (_request, response) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment 
  const { value1, value2, op } = _request.body;
	console.log(value1);

	// Validate data
	if ( !value1 || isNaN(Number(value1)) ) {
    return response.status(400).send({ error: 'Missing value 1'});
  }
	else if (!value2 || isNaN(Number(value2))) {
		return response.status(400).send({ error: 'Missing value 2'});
	}
	else if (!op) {
		return response.status(400).send({ error: 'Missing operation'});
	}

	// Assert the type
	const operation = op as Operation;

  const result = calculator(Number(value1), Number(value2), operation);
  return response.send({ result });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
