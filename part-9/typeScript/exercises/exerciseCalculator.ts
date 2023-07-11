interface ExerciseStats {
	periodLength: number,
	trainingDays: number,
	success: boolean,
	rating: number,
	ratingDescription: string,
	target: number,
	average: number
}

// Calculates the average time of daily exercise hours and compares it to the target amount of daily 
// hours and returns an object
const calculateExercises = (exerciseHours: number[], targetHours: number): ExerciseStats => {
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
		average: _average
	}
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
}

// Total / number of days
const average = (totalHours: number, totalDays: number): number => {
	return totalHours / totalDays;
};

const isTargetReached = (targetHours: number, average: number): boolean => {
	if (average >= targetHours) {
		return true;
	}
	else if (average < targetHours) {
		return false;
	}
};

// Target - average > 1 -> 3
// Target - average < 1 AND Target - average > 0 -> 2
// Else 1
const hoursRating = (targetHours: number, average: number): number => {
	if (targetHours - average > 1) {
		return 3;
	}
	else if (targetHours - average < 1) {
		return 2;
	}
	else {
		return 1;
	}
};

// 3 -> Great work
// 2 -> Could be better
// 1 -> Improvement needed
const ratingDescription = (rating: number): string => {
	if (rating === 3) {
		return 'Great work';
	}
	else if (rating === 2) {
		return 'Could be better';
	}
	else if (rating === 1) {
		return 'Improvement needed';
	}
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
