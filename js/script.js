const countElement = document.getElementById('count__element');
const saveElement = document.getElementById('save__element');
const totalElement = document.getElementById('total__element');
const addButton = document.getElementById('btn__add');
const saveButton = document.getElementById('btn__save');
const resetButton = document.getElementById('btn__reset');

let count = 0;
let total = 0;

function increment() {
	count += 1;
	countElement.textContent = count;
}

function save() {
	let countStr = count + ' - ';
	saveElement.textContent += countStr;
	totalKeys();
	count = 0;
	countElement.textContent = count;
}

function totalKeys() {
	total += count;
	totalElement.textContent = 'Total keys done this week: ' + total;
}

function reset() {
	count = 0;
	countElement.textContent = 0;
	saveElement.textContent = 'Previous numbers of keys done: ';
}

addButton.addEventListener('click', () => {
	increment();
});

saveButton.addEventListener('click', () => {
	save();
	totalKeys();
});

resetButton.addEventListener('click', () => {
	reset();
});
