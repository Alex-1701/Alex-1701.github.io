'use strict';

//const { mainModule } = require("node:process");

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

// Цвета должня быть адаптивными к входящему объекту.
var COLORS = {
	0 : 'grey',
	1 : 'rgb(255, 0, 0)', // red
	2 : 'orange',
	3 : 'yellow',
	4 : 'blue',
	5 : 'green',
	6 : 'MediumVioletRed',
}
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

function showColor(color_number) {
	var example = document.getElementById('example');
	example.style.backgroundColor = COLORS[color_number];
	console.log(example.innerText);
}

function main() {
	// создать объект класса таблица таблица.
	var t = new Table(getGridObject(), 'grid');
	
	// вставить табицу в страницу.
	t.generateTable();

	//build_select_panel();
	
	console.log(t.data_object);
}


main();