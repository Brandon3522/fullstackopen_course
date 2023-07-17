interface ExerciseStats {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

/* interface CLStats {
  targetHours: number;
  exerciseHours: number[];
} */

const parseArguments0 = (args: string[]) => {
  if (args.length < 4) {
    throw new Error('Not enough arguments');
  }

  // Get only input arguments
  const slicedArray = args.slice(3);

  // Check if arguments are numbers
  const allNumbers = slicedArray.every((num) => !isNaN(Number(num)));

  if (!isNaN(Number(args[2])) && allNumbers) {
    return {
      targetHours: Number(args[2]),
      exerciseHours: args.slice(3).map(Number), // Change each value to a number
    };
  } else {
    throw new Error('All arguments must be numbers');
  }
};

// Calculates the average time of daily exercise hours and compares it to the target amount of
// daily hours
// returns an ExerciseStats object
export const calculateExercises = (
  exerciseHours: number[],
  targetHours: number
): ExerciseStats => {
  const totalDays = exerciseHours.length;

  const _trainingDays = totalTrainingDays(exerciseHours);

  const _totalHours = totalHours(exerciseHours);

  const _average = average(_totalHours, totalDays);

  const _targetReached = isTargetReached(targetHours, _average);

  const _rating = hoursRating(targetHours, _average);

  const _ratingDescription = ratingDescription(_rating);

  return {
    periodLength: totalDays,
    trainingDays: _trainingDays,
    success: _targetReached,
    rating: _rating,
    ratingDescription: _ratingDescription,
    target: targetHours,
    average: _average,
  };
};

const totalTrainingDays = (exerciseHours: number[]): number => {
  let numberOfDays = 0;
  for (let i = 0; i <= exerciseHours.length - 1; i++) {
    if (exerciseHours[i] > 0) {
      numberOfDays++;
    }
  }

  return numberOfDays;
};

const totalHours = (exerciseHours: number[]): number => {
  let hours = 0;

  for (let i = 0; i <= exerciseHours.length - 1; i++) {
    hours += exerciseHours[i];
  }

  return hours;
};

// Total / number of days
const average = (totalHours: number, totalDays: number): number => {
  return totalHours / totalDays;
};

const isTargetReached = (targetHours: number, average: number): boolean => {
  if (average >= targetHours) {
    return true;
  } else if (average < targetHours) {
    return false;
  }

  return false;
};

// Target .5 from average -> 3
// Target 1 from average < 1 AND Target - average > 0 -> 2
// Else 1
const hoursRating = (targetHours: number, average: number): number => {
  if (targetHours - average <= .5) {
    return 3;
  } else if (targetHours - average <= 1) {
    return 2;
  } else {
    return 1;
  }
};

// 3 -> Great work
// 2 -> Could be better
// 1 -> Improvement needed
const ratingDescription = (rating: number): string => {
  if (rating === 3) {
    return 'Great work';
  } else if (rating === 2) {
    return 'Could be better';
  } else if (rating === 1) {
    return 'Improvement needed';
  }

  return '';
};

console.log(calculateExercises([1, 0, 2, 4.5, 0, 3, 1, 0, 4], 2));

// Exercise 9.3
try {
  const { targetHours, exerciseHours } = parseArguments0(process.argv);
  console.log(`Target hours: ${targetHours}, exercise hours: ${exerciseHours}`);
  console.log(calculateExercises(exerciseHours, targetHours));
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log(`Error: ${error.message}`);
  }
}
