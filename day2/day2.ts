import { data } from './data';
const MAX_BLUE = 14;
const MAX_RED = 12;
const MAX_GREEN = 13;
// max cubes 12 red cubes, 13 green cubes, and 14 blue cubes
// 1, 2, and 5 are possible
// game 3 would have been impossible because at one point the Elf showed you 20 red cubes at once; etc.
// example data should = 8
const testData = [
	'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green',
	'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue',
	'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red',
	'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red',
	'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green',
];

// result = 8
[
	{ blue: 3, red: 4, green: 0 },
	{ blue: 6, red: 1, green: 2 },
	{ blue: 0, red: 0, green: 2 },
];

type Games = {
	blue: number;
	red: number;
	green: number;
};
const res = data.map((str) => {
	let gameArr: Games[] = [];
	const tempArr = str.split(':')[1].split(';');
	tempArr.map((gameStr) => {
		const blueIndex = gameStr.indexOf('blue');
		const redIndex = gameStr.indexOf('red');
		const greenIndex = gameStr.indexOf('green');
		const blueVal =
			blueIndex === -1 ? 0 : gameStr.slice(blueIndex - 3, blueIndex);
		const redVal = redIndex === -1 ? 0 : gameStr.slice(redIndex - 3, redIndex);
		const greenVal =
			greenIndex === -1 ? 0 : gameStr.slice(greenIndex - 3, greenIndex);
		const bagPull = {
			blue: +blueVal,
			red: +redVal,
			green: +greenVal,
		};
		gameArr.push(bagPull);
	});
	return gameArr;
});

export const part1Arr = res;

// [
// 	{ blue: 3, red: 4, green: 0 },
// 	{ blue: 6, red: 1, green: 2 },
// 	{ blue: 0, red: 0, green: 2 },
// ];

const finalRes = res.map((gamesArr) => {
	let validGame = true;
	gamesArr.map((game) => {
		if (!validGame) return;
		// console.log(arrIndex, game);
		const blueValid = game.blue <= MAX_BLUE;
		const redValid = game.red <= MAX_RED;
		const greenValid = game.green <= MAX_GREEN;
		if (blueValid && redValid && greenValid) {
			validGame = true;
		} else {
			validGame = false;
		}
	});
	return validGame;
});

console.log(
	finalRes.reduce(
		(prev, cur, index) => (cur ? prev + (index + 1) : prev + 0),
		0
	)
);
