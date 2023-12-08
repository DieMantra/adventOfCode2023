import * as fs from 'fs';

export function returnArrayOfDigits(start: number, end: number) {
	let val = [];
	for (let index = start; index <= end; index++) {
		val.push(index);
	}
	return val;
}
export function splitTextFileRelativeToRoot(path: string) {
	const data = String(fs.readFileSync(path)).split(/\r?\n/);
	return data;
}
