'use strict';

var table = null;

function getGridObject() {
	// Функция должна отдавать готовую играбельную таблицу.
	var myMatrix = 
	[
		[1, 1, 3, 4, 5, 4],
		[1, 1, 0, 0, 2, 1],
		[4, 3, 0, 0, 1, 3],
		[2, 5, 0, 0, 4, 4],
		[1, 3, 4, 3, 4, 4],
	];

	var randX = 10; 
	var randY = 10;
	var randMatrix = new Array(randX);
	for (var i = 0; i < randX; i++) {
		randMatrix[i] = new Array(randY);
		for (var j = 0; j < randY; j++) {
			randMatrix[i][j] = Math.floor(Math.random() * (7-1) + 1);
		}
	}

	var object = {
		// Матрица цветов клеток.
		grid: myMatrix,
		// Массив клеток принадлежащих игроку.
		player_array: [[0, 0], [0, 1], [1, 0], [1, 1]],
		player_color: 1,
		// Массив клеток принадлежащих противнику.
		enemy_array: [[4, 4], [3, 5], [3, 4], [4, 5]],
		enemy_color: 2
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
	console.log('Ход игрока');
	//var finished = false;
	if(table.changeAreaColor(x, y, 'player')) {
		console.log('Игрок походил');
		enemyTurn();
	}
	else {
		console.log('низя так ходить');
	}
}

function enemyTurn() {
	console.log('Ход противника...');
	//console.log(Enemy.turn(table.getTableData()));
	//table.changeAreaColor(x, y, 'enemy');
	console.log('Противник походил');
}

function sleep(ms) {
	// Нужна асинхронность!
	/*ms += new Date().getTime();
	while (new Date() < ms){}*/
	setTimeout(() => console.log('f'), ms);
} 

function main() {
	// Создаём объект класса таблица таблица.
	table = new Table(getGridObject(), 'grid');
	
	// Вставляем табицу в страницу.
	table.generateTable();

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