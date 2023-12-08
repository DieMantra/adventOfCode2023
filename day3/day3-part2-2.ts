import * as fs from 'fs';
import { returnArrayOfDigits } from '../utils';
const data = String(fs.readFileSync('./day3/data.txt')).split(/\r?\n/);
/*
 *-10123456789-1
 *  467..114..
 *  ...*......
 *  ..35..633.
 *  ......#...
 *  617*......
 *  .....+.58.
 *  ..592.....
 *  ......755.
 *  ...$.*....
 *  .664.598..
 * (467 * 35) + (755 * 598) = 467,835
 */
let testData = [
	'467..114..',
	'...*......',
	'..35..633.',
	'......#...',
	'617*......',
	'.....+.58.',
	'*.592.....',
	'......755.',
	'...$.*....',
	'.664.598..',
];

const starRegex = /\*/g;
const digitRegex = /\d+/g;
const matchedValues = data.flatMap((str, originIndex, inputArray) => {
	let matches = [];
	let match;

	while ((match = starRegex.exec(str)) !== null) {
		const previousLineString = inputArray[originIndex - 1];
		const nextLine = inputArray[originIndex + 1];

		const starLeftOf = match.index - 1;
		const starRightOf = match.index + 1;

		const matchPrev = returnDigits(previousLineString, starLeftOf, starRightOf);
		const matchNext = returnDigits(nextLine, starLeftOf, starRightOf);
		const matchLeft = returnDigits(str, starLeftOf, starLeftOf);
		const matchRight = returnDigits(str, starRightOf, starRightOf);

		const filteredPrev = matchPrev.filter((obj) => obj.isMatch);
		const filteredNext = matchNext.filter((obj) => obj.isMatch);
		const filteredLeft = matchLeft.filter((obj) => obj.isMatch);
		const filteredRight = matchRight.filter((obj) => obj.isMatch);

		const filteredMore = [
			filteredPrev,
			filteredNext,
			filteredLeft,
			filteredRight,
		]
			.filter((objArrays) => {
				if (objArrays.length < 1) return false;

				return true;
			})
			.flat();
		if (filteredMore.length > 1) {
			matches.push(filteredMore.reduce((prev, curr) => prev * +curr.value, 1));
		}
	}

	return matches.flat();
});

console.log(matchedValues.reduce((prev, curr) => prev + curr, 0));

function returnDigits(str: string, starLeftOf: number, starRightOf: number) {
	let lineMatches = [];
	let lineMatch;
	while ((lineMatch = digitRegex.exec(str)) !== null) {
		const prevStart = lineMatch.index;
		const prevEnd = lineMatch.index + (lineMatch[0].length - 1);
		const prevIndexes = returnArrayOfDigits(prevStart, prevEnd);
		const isMatch = prevIndexes.some((idx) => {
			return idx >= starLeftOf && idx <= starRightOf;
		});
		lineMatches.push({ isMatch, value: lineMatch[0] });
	}
	return lineMatches;
}
