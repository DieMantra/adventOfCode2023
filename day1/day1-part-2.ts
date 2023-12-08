import { data } from './day1Data';

const NUMBER_CHAR = {
	one: '1',
	two: '2',
	three: '3',
	four: '4',
	five: '5',
	six: '6',
	seven: '7',
	eight: '8',
	nine: '9',
} as const;

const res = data.map((str) => {
	let tempArr: string[] = [];

	Object.keys(NUMBER_CHAR).map((key) => {
		const Tkey = key as keyof typeof NUMBER_CHAR;
		const index = str.indexOf(Tkey);
		const lastIndex = str.lastIndexOf(Tkey);
		if (index !== -1) {
			tempArr[index] = NUMBER_CHAR[Tkey];
		}
		if (lastIndex !== -1) {
			tempArr[lastIndex] = NUMBER_CHAR[Tkey];
		}
	});

	str.split('').map((char, i) => {
		if (Number.isInteger(+char)) {
			tempArr[i] = char;
		}
	});
	const cleanArr = tempArr.filter(String);
	const answer = `${cleanArr[0]}${cleanArr[cleanArr.length - 1]}`;
	return answer;
});
console.log(res.reduce((prev, cur) => prev + +cur, 0));
