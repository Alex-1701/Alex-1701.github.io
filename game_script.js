'use strict';

var table = new Table;
var playerAllowed = false;
var enemyAllowed = false;

function getGridObject() {
	var object = {
		player_position: [0, 0],
		enemy_position: [5, 5],
		grid : [
			[1, 2, 3, 4, 5, 4],
			[1, 3, 0, 0, 2, 1],
			[4, 3, 0, 0, 4, 3],
			[2, 5, 0, 0, 5, 1],
			[1, 3, 4, 3, 2, 3],
		]
	};

	return object;
}

// Цвета должны быть адаптивными к входящему объекту.
var COLORS = {
	0 : 'grey',
	1 : 'rgb(255, 0, 0)', // red
	2 : 'orange',
	3 : 'yellow',
	4 : 'blue',
	5 : 'green',
	6 : 'MediumVioletRed',
}

function showColor(color_number) {
	var example = document.getElementById('example');
	example.style.backgroundColor = COLORS[color_number];
	console.log(example.innerText);
}

function test(event) {
	console.log(event);
}

function userTurn(x, y, color) {
	console.log('Действие игрока');

	if (playerAllowed) {
		enemyAllowed = false;
		console.log('Ход игрока');
		//console.log('[' + x + ';' + y + '] cl:' + color);
		//table.data_object.grid[x][y] = 0; //Number(color);		
		//console.log(table.data_object.grid);
		
		//table.changeColor(x, y, 0);

		playerAllowed = false;
		enemyAllowed = true;

		console.log('Игрок походил');
		console.log('!!!' + ' ' + playerAllowed);
		enemyTurn();
	}
	else {
		console.log('Игрок не может ходить');
	}
}

function enemyTurn() {
	if (enemyAllowed) {
		playerAllowed = false;
		console.log('Ход противника...');
		console.log(playerAllowed);
		sleep(1*1000);
		console.log(playerAllowed);
		console.log('Противник походил');

		playerAllowed = true;
		enemyAllowed = false;
		console.log(playerAllowed);
	}
	else {
		console.log('Противник не может ходить');
	}
}

function sleep(ms) {
	// Нужна асинхронность!
	/*ms += new Date().getTime();
	while (new Date() < ms){}*/
	setTimeout(() => console.log('f'), ms);
} 

function main() {
	console.log('main');
	// создать объект класса таблица таблица.
	table = new Table(getGridObject(), 'grid');
	
	// вставить табицу в страницу.
	table.generateTable();
	
	playerAllowed = true;

	while (false) {
		console.log('Ход игрока');
		
	}
	
	//build_select_panel();
	
	//console.log(t.data_object);
}

main();


/*
function generateGrid(object) {
	var grid = document.getElementById('grid');
	var arr = object.grid;

	for (let i = 0; i < arr.length; i++) {
		var row = document.createElement('tr');
		for (let j = 0; j < arr[i].length; j++) {
			var cell = document.createElement('td');
			cell.setAttribute('onclick', `lol(${arr[i][j]})`);
			cell.setAttribute('onmouseover', "style.borderColor = 'red'; style.borderWidth = '2px'");
			cell.setAttribute('onmouseout', `style.borderColor = 'black'; style.borderWidth = '2px'`);
			cell.style.backgroundColor = COLORS[arr[i][j]];
			row.appendChild(cell);
		}
		grid.appendChild(row);
	}
}


function build_select_panel() {
	console.log('kek');
	var panel = document.getElementById('select_panel');
	var table = document.createElement('table');
	var row = document.createElement('tr');
	
	Object.keys(COLORS).forEach(e => {
		var cell = document.createElement('td');
		console.log(e + "\t" + COLORS[e]);
		cell.style.backgroundColor = COLORS[e];
		row.appendChild(cell);
	});
	
	table.appendChild(row);
	panel.appendChild(table);
}
*/