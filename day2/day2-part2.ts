import { part1Arr } from './day2';
const part2Res = part1Arr
	.map((game) => {
		let result = { blue: 0, red: 0, green: 0 };
		game.map((game) => {
			result.blue = game.blue > result.blue ? game.blue : result.blue;
			result.red = game.red > result.red ? game.red : result.red;
			result.green = game.green > result.green ? game.green : result.green;
		});

		return Object.keys(result).reduce((prev, curKey) => {
			const typedKey = curKey as keyof typeof result;
			return prev * result[typedKey];
		}, 1);
	})
	.reduce((prev, cur) => prev + cur, 0);

console.log(part2Res);
