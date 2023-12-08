import * as fs from 'fs';

/*
 * 467..114..
 * ...*......
 * ..35..633.
 * ......#...
 * 617*......
 * .....+.587
 * 467 + 35 + 633 + 617 = 1,752
 * What is the sum of all of the part numbers in the engine schematic?
 */

let data: string[] = String(fs.readFileSync('./day3/data.txt')).split(/\r?\n/);
let testData = [
	'467..114..',
	'.*.*......',
	'..35..633*',
	'......#...',
	'617*......',
	'.....+.587',
]; /* 1,752 */
const regex = /\d+/g;

function findDigits(inputData: string[]) {
	return data.map((str) => {
		let matches = [];
		let match;

		while ((match = regex.exec(str)) !== null) {
			let leftOf = match.index - 1;
			let rightOf = match.index + match[0].length;
			let topOf = {
				start: leftOf,
				end: rightOf,
			};
			let bottomOf = topOf;

			matches.push({
				value: match[0],
				startingIndex: match.index,
				endingIndex: match[0].length - 1,
				leftOf,
				rightOf,
				topOf,
				bottomOf,
				inputLength: match.input.length,
			});
		}
		return matches;
	});
}

function part1(data: string[]): number {
	let finalResult = 0;
	let lines = findDigits(data);
	const resultArray = lines.flatMap((line, lineIndex) => {
		const prevLine = data[lineIndex - 1];
		const nextLine = data[lineIndex + 1];
		if (line.length < 1) return;
		const validDigits = line.map((digit) => {
			let topValid;
			let bottomValid;
			let leftValid;
			let rightValid;
			let numberOfMatches = 0;
			if (!prevLine) {
				topValid = false;
			} else {
				const validation = checkChar({
					start: digit.topOf.start,
					end: digit.topOf.end + 1,
					str: prevLine,
				});
				topValid = validation.valid;
				numberOfMatches += validation.amount;
			}
			if (!nextLine) {
				bottomValid = false;
			} else {
				const validation = checkChar({
					start: digit.bottomOf.start,
					end: digit.bottomOf.end + 1,
					str: nextLine,
				});
				bottomValid = validation.valid;
				numberOfMatches += validation.amount;
			}
			if (digit.leftOf === -1) {
				leftValid = false;
			} else {
				const validation = checkChar({
					start: digit.leftOf,
					end: digit.leftOf + 1,
					str: data[lineIndex],
				});
				leftValid = validation.valid;
				numberOfMatches += validation.amount;
			}
			if (digit.rightOf === digit.inputLength) {
				rightValid = false;
			} else {
				const validation = checkChar({
					start: digit.rightOf,
					end: digit.rightOf + 1,
					str: data[lineIndex],
				});
				rightValid = validation.valid;
				numberOfMatches += validation.amount;
			}
			return {
				topValid,
				bottomValid,
				leftValid,
				rightValid,
				digit: digit.value,
				numberOfMatches,
			};
		});
		return validDigits;
	});

	finalResult = resultArray.reduce((prev, cur) => {
		if (!cur || +cur.numberOfMatches <= 0) return prev;
		return prev + +cur.digit;
	}, 0);

	return finalResult;
}
console.log(part1(data));
function checkChar({
	start,
	end,
	str,
}: {
	start: number;
	end: number;
	str: string;
}) {
	const inputString = str.substring(start, end);
	const result = inputString.match(/[^a-zA-Z0-9_.\s]/g);
	return {
		valid: result?.length ? true : false,
		amount: result?.length || 0,
	};
}
