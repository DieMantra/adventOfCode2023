// Import a utility function to read the data file
import { splitTextFileRelativeToRoot } from '../utils';
// Read the data file
const data = splitTextFileRelativeToRoot('./day4/data.txt');
// This function checks how many winning numbers are on a card
const returnCardPoints = (card: string) => {
	let points = 0; // Start with zero points
	const numbers = card.split(':')[1]; // Get the numbers from the card
	const [pickedNumbers, winningNumbers] = numbers
		.split('|')
		.map((numbers) => numbers.match(/\d+/g)); // Split the numbers into picked numbers and winning numbers
	// For each picked number, check if it's a winning number
	for (const num of pickedNumbers || []) {
		if (winningNumbers?.includes(num)) {
			points += 1; // If it's a winning number, add a point
		}
	}
	return points; // Return the total points
};
// This function calculates how many copies of each card you have
function part2(data: string[]) {
	const cardInstances = data.map(() => 1); // Start with one copy of each card
	// For each card in the data
	for (let i = 0; i < data.length; i++) {
		// Calculate how many points the card has
		const numberOfMatches = returnCardPoints(data[i]);
		// For each point, add a copy of the card
		for (let j = 0; j < numberOfMatches; j++) {
			cardInstances[i + j + 1] += cardInstances[i]; // Add the copies to the next card
		}
	}
	// Add up all the copies
	return cardInstances.reduce((prev, cur) => prev + cur, 0);
}
// Run the function and print the result
console.log(part2(data));
