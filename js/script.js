const countElement = document.getElementById('count__element');
const saveElement = document.getElementById('save__element');
const totalElement = document.getElementById('total__element');
const addButton = document.getElementById('btn__add');
const saveButton = document.getElementById('btn__save');
const resetButton = document.getElementById('btn__reset');

// User input
const regionInput = document.getElementById('region__input');
const realmInput = document.getElementById('realm__input');
const charactersNameInput = document.getElementById('characters__name__input');
const requestButton = document.getElementById('btn__request');
const charactersElement = document.getElementById('characters__element');

let count = 0;
let total = JSON.parse(localStorage.getItem('keys')) || 0;

const characters = {
	region: '',
	realm: '',
	name: '',
};

async function getCharactersInfos() {
	const response = await fetch(
		`https://raider.io/api/v1/characters/profile?region=${characters.region}&realm=${characters.realm}&name=${characters.name}&fields=mythic_plus_weekly_highest_level_runs`
	);
	const data = await response.json();
	displayInfos(data);
	console.log(data);
}

function displayInfos(data) {
	const charactersDiv = document.createElement('div');
	charactersDiv.classList.add('characters__infos__container');
	const charactersName = document.createElement('p');
	const charactersClass = document.createElement('p');
	const charactersSpec = document.createElement('p');
	let weeklyHighestRuns = [];

	charactersName.textContent = data.name;
	charactersClass.textContent = data.class;
	charactersSpec.textContent = data.active_spec_name;

	weeklyHighestRuns = data.mythic_plus_weekly_highest_level_runs;

	charactersElement.appendChild(charactersDiv);
	charactersDiv.appendChild(charactersName);
	charactersDiv.appendChild(charactersClass);
	charactersDiv.appendChild(charactersSpec);

	for (let i = 0; i < weeklyHighestRuns.length; i++) {
		const keyList = document.createElement('ul');
		keyList.innerHTML += `<li> ${weeklyHighestRuns[i].dungeon} ${weeklyHighestRuns[i].mythic_level} </li>`;

		charactersDiv.appendChild(keyList);
	}
}

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
	localStorage.setItem('keys', JSON.stringify(total));
	totalElement.textContent = 'Total keys done this week: ' + total;
}

function reset() {
	count = 0;
	total = 0;
	countElement.textContent = 0;
	saveElement.textContent = 'Previous numbers of keys done: ';
	totalElement.textContent = '';
	localStorage.clear();
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

//
regionInput.addEventListener('input', (e) => {
	characters.region = e.target.value;
});

realmInput.addEventListener('input', (e) => {
	characters.realm = e.target.value;
});

charactersNameInput.addEventListener('input', (e) => {
	characters.name = e.target.value;
});

requestButton.addEventListener('click', () => {
	getCharactersInfos();
});
