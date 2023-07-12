

// Hacker Rank: Sparse Arrays

// Better solution -> Hash Map
function matchingStrings(strings: string[], queries: string[]): number[] {
	// Create return array
	let result_array: number[] = Array(queries.length).fill(0);

	// Search through strings with each query
	// Increment return array at query index if found
	for (let i = 0; i <= queries.length - 1; i++) {
			for (let j = 0; j <= strings.length - 1; j++) {
					if (queries[i] === strings[j]) {
							result_array[i] ++;
					}
			}
	}
	return result_array;
}

console.log(matchingStrings(['aba', 'baba', 'aba', 'xzxb'], ['aba', 'xzxb', 'ab']));