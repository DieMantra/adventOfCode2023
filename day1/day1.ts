import { data } from './day1Data';

let result: string[] = [];
// map over the array
data.map((str) => {
	// and then for each string map once forwards to find first number
	const firstNumber = findFirstInt(str.split(''));

	// and map once to find last number
	const lastNumber = findFirstInt(reversStr(str).split(''));

	// push them to an array
	const joinedNumber = `${firstNumber}${lastNumber}`;
	result.push(joinedNumber);
});
// turn each string in the result array to numbers and sum that array of numbers
const sum = result.reduce((acc, val) => acc + +val, 0);
console.log(sum);

function findFirstInt(str: string[]): string {
	return str.find((val) => Number.isInteger(+val)) || '0';
}

function reversStr(str: string): string {
	return str.split('').reverse().join();
}
