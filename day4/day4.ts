import { splitTextFileRelativeToRoot } from '../utils';
const data = splitTextFileRelativeToRoot('./day4/data.txt');

let testData = [
	'Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53',
	'Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19',
	'Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1',
	'Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83',
	'Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36',
	'Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11',
];
/*
 * 1 match = 1 point
 * each match after the first doubles the previous amount of points
 * card 1: (48, 83, 17, and 86) = 8 points
 */

let gameScores: number[] = [];

data.forEach((card) => {
	let cardNumbers = card
		.split(':')[1]
		.split('|')
		.map((numbers) => numbers.split(' ').filter((str) => str.length !== 0));
	let score = 0;

	cardNumbers[0].forEach((pickedNumber) => {
		const gameNumbers = cardNumbers[1];
		gameNumbers.forEach((number) => {
			if (+pickedNumber === +number) {
				if (score === 0) {
					score = 1;
				} else {
					score = score * 2;
				}
			}
		});
	});

	gameScores.push(score);
});

console.log(gameScores.reduce((prev, cur) => prev + cur, 0));
