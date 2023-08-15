const countElement = document.getElementById('count__element');
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
}

function displayInfos(data) {
	const charactersDiv = document.createElement('div');
	charactersDiv.classList.add('characters__infos__container');
	const charactersName = document.createElement('p');
	const charactersClass = document.createElement('p');
	const charactersSpec = document.createElement('p');
	const weeklyRunsDiv = document.createElement('div');
	weeklyRunsDiv.classList.add('weekly__runs__container');
	const keyList = document.createElement('ul');

	let weeklyHighestRuns = [];

	charactersName.textContent = `Name : ${data.name}`;
	charactersClass.textContent = `Class : ${data.class}`;
	charactersSpec.textContent = `Spe : ${data.active_spec_name}`;

	weeklyHighestRuns = data.mythic_plus_weekly_highest_level_runs;

	charactersElement.appendChild(charactersDiv);
	charactersDiv.appendChild(charactersName);
	charactersDiv.appendChild(charactersClass);
	charactersDiv.appendChild(charactersSpec);
	charactersElement.appendChild(weeklyRunsDiv);
	weeklyRunsDiv.appendChild(keyList);

	for (let i = 0; i < weeklyHighestRuns.length; i++) {
		keyList.innerHTML += `<li> ${weeklyHighestRuns[i].dungeon} <span>${weeklyHighestRuns[i].mythic_level}</span></li>`;
	}
}

function increment() {
	count += 1;
	countElement.textContent = count;
}

function save() {
	total += count;
	totalKeys();
	count = 0;
	countElement.textContent = count;
}

function totalKeys() {
	localStorage.setItem('keys', JSON.stringify(total));
	totalElement.textContent = 'Total keys done this week: ' + total;
}

function reset() {
	count = 0;
	total = 0;
	countElement.textContent = 0;
	totalElement.textContent = '';
	localStorage.clear();
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

//
regionInput.addEventListener('input', (e) => {
	characters.region = e.target.value;
});

realmInput.addEventListener('input', (e) => {
	characters.realm = e.target.value;
});

charactersNameInput.addEventListener('keypress', (e) => {
	characters.name = e.target.value;
	if (e.key === 'Enter') {
		e.preventDefault();
		requestButton.click();
	}
});

requestButton.addEventListener('click', () => {
	getCharactersInfos();
});
