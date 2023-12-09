import { returnArrayOfDigits, splitTextFileRelativeToRoot } from '../utils';
const data = splitTextFileRelativeToRoot('./day4/data.txt');

/*
1. Each card has a set of numbers. Some of these numbers are "winning" numbers.
2. If a card has N winning numbers, you get N extra copies of the next N cards.
3. This rule applies to both original and copied cards. So if a copied card has winning numbers, you get extra cards for those as well.

Example:

- Card 1 has 4 winning numbers, so you get 4 extra copies of the next 4 cards (Cards 2, 3, 4, 5).
- Now, you have 2 copies of Card 2 (the original and one copy from Card 1). Each Card 2 has 2 winning numbers, so you get 2 extra copies of the next 2 cards (Cards 3, 4) for each Card 2. This gives you 4 extra copies in total.
- You now have 5 copies of Card 3 (the original, one copy from Card 1, and three copies from Card 2). Each Card 3 has 2 winning numbers, so you get 2 extra copies of the next 2 cards (Cards 4, 5) for each Card 3. This gives you 10 extra copies in total.
- And so on for the rest of the cards.

The process stops when you reach a card that has no winning numbers, because such a card doesn't give you any extra copies.
*/
let testData = [
	'Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53',
	'Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19',
	'Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1',
	'Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83',
	'Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36',
	'Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11',
];

function findMatches(card: string, dataArray: string[], depth = 0) {
	if (depth > 50) {
		// adjust this limit as needed
		return { copies: 0, cardIndex: 0 };
	}
	let cardId = +card.split(':')[0].split(' ')[1] - 1;

	let copies = 0;
	let cardNumbers = card
		.split(':')[1]
		.split('|')
		.map((numbers) => numbers.split(' ').filter((str) => str.length !== 0));

	cardNumbers[0].forEach((pickedNumber) => {
		const gameNumbers = cardNumbers[1];

		gameNumbers.forEach((number) => {
			if (+pickedNumber === +number) {
				copies++;
			}
		});
	});

	if (copies <= 0) {
		return { copies: 0, cardIndex: cardId };
	} else {
		const searchableCopies = returnArrayOfDigits(cardId + 1, cardId + copies);
		searchableCopies.forEach((copy) => {
			const copyMatches = findMatches(dataArray[copy], dataArray, depth + 1);
			copies += copyMatches.copies;
		});

		return {
			copies,
			cardIndex: cardId,
		};
	}
}

let totalCopies = data.length;
for (let card of data) {
	const matches = findMatches(card, data);
	totalCopies += matches.copies;
}
console.log(totalCopies);
