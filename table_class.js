'use strict';

class Table {
	data_object;
	DOM_table_id;

	constructor(object, table_id) {
		console.log('Инициализация объекта таблицы');
		this.data_object = object;
		this.DOM_table_id = table_id;
	}

	generateTable() {
		// Метод собирает и вставляем DOM таблицу.
		var grid = document.getElementById(this.DOM_table_id);
		var arr = this.data_object.grid;

		for (let i = 0; i < arr.length; i++) {
			var row = document.createElement('tr');
			for (let j = 0; j < arr[i].length; j++) {
				var cell = document.createElement('td');
				cell.setAttribute('onclick', `console.log(${arr[i][j]})`);
				cell.setAttribute('onmouseover', "style.borderColor = 'red'; style.borderWidth = '2px'");
				cell.setAttribute('onmouseout', `style.borderColor = 'black'; style.borderWidth = '2px'`);
				cell.style.backgroundColor = COLORS[arr[i][j]];
				cell.innerText = arr[i][j];
				row.appendChild(cell);
			}
			grid.appendChild(row);
		}
	}
}