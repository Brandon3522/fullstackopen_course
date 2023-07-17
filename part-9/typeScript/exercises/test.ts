// Hacker Rank: Sparse Arrays

// Better solution -> Hash Map
function matchingStrings(strings: string[], queries: string[]): number[] {
  // Create return array
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const result_array: number[] = Array(queries.length).fill(0);

  // Search through strings with each query
  // Increment return array at query index if found
  for (let i = 0; i <= queries.length - 1; i++) {
    for (let j = 0; j <= strings.length - 1; j++) {
      if (queries[i] === strings[j]) {
        result_array[i]++;
      }
    }
  }
  return result_array;
}

console.log(
  matchingStrings(['aba', 'baba', 'aba', 'xzxb'], ['aba', 'xzxb', 'ab'])
);

console.log(`${typeof "val"}`);

const daily_exercises = ["grg", 0, 2, 0, 3, 0, 2.5];

const result0 = daily_exercises.every((value) => {
	console.log(`Daily exercises: ${typeof value}`);
	return typeof value !== 'number';
});

console.log(`Result: ${result0}`);
