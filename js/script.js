const countElement = document.getElementById('count__element');
const saveElement = document.getElementById('save__element');
const addButton = document.getElementById('btn__add');
const saveButton = document.getElementById('btn__save');
const resetButton = document.getElementById('btn__reset');

let count = 0;

function increment() {
	count += 1;
	countElement.textContent = count;
}

function save() {
	let countStr = count + ' - ';
	saveElement.textContent += countStr;
	count = 0;
	countElement.textContent = count;
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
});

resetButton.addEventListener('click', () => {
	reset();
});
