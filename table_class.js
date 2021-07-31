'use strict';

class Table {
	DOM_table_id;
	grid;
	player_area;
	enemy_area;
	player_color;
	enemy_color;

	constructor(object, table_id) {
		console.log('Инициализация объекта таблицы');

		this.DOM_table_id = table_id;
		this.grid = object.grid;
		this.player_area = object.player_array;
		this.enemy_area = object.enemy_array;
		this.player_color = object.player_color;
		this.enemy_color = object.enemy_color;
	}

	generateTable() {
		// Метод собирает и вставляем DOM таблицу.
		var DOM_table = document.getElementById(this.DOM_table_id);
		var arr = this.grid;
		
		for (let i = 0; i < arr.length; i++) {
			var row = document.createElement('tr');
			for (let j = 0; j < arr[i].length; j++) {
				var cell = document.createElement('td');
				cell.setAttribute('data-x', i);
				cell.setAttribute('data-y', j);
				cell.setAttribute('data-cl', arr[i][j]);
				
				if(arr[i][j] == 0) {
					// Если это не играбельная клетка.
					cell.className = 'neutral';					
				} else {
					// Если это обычная клетка.
					// Привязываем вызов функции к клетке.
					cell.setAttribute('onclick', 'userTurn(this.dataset.x, this.dataset.y, this.dataset.cl)');
					// Раскрашиваем клетку.
					cell.style.backgroundColor = COLORS[arr[i][j]];
					// По умолчанию клетка свободная.
					cell.className = 'free';

					// Выделение клеток из областей игрока.
					this.player_area.forEach(element => {
						if (element[0] == i && element[1] == j){
							cell.className = 'player';
						}
					});

					// Выделение клеток из областей противника.
					this.enemy_area.forEach(element => {
						if (element[0] == i && element[1] == j){
							cell.className = 'enemy';
						}
					});
				}

				cell.innerText = arr[i][j];
				row.appendChild(cell);
			}
			DOM_table.appendChild(row);
		}
	}

	changeTableCellColor(x, y, color) {
		var line = document.querySelectorAll(`[data-x='${x}']`);
		var cell;

		line.forEach(element => {
			if (element.getAttribute("data-y") == y)
				cell = element;
		});
		
		cell.style.backgroundColor = COLORS[color];
		cell.innerText = color;

		/*

		var line = document.querySelectorAll(`[data-x="${x}"]`);
		console.log(line);
		var cell = line[0].querySelector(`[data-y="${y}"]`);
		*/
		//console.log('[' + x + ';' + y + '] cl:' + color);
		//this.data_object.grid[x][y] = color;


		//console.log(this.data_object);
	}

	changeAreaColor(x, y, turn) {
		var result = true;

		if (turn == 'player') {
			// Игрок ходит
			// Игрок может нажать на свою область, на ничью область, на область противника, на неигровую область.
			
			// Проверка нажатия на свою область.
			this.player_area.forEach(cell => {
				if (cell[0] == x && cell[1] == y) {
					// Значит ткнул на себя.
					result = false;
				}
			});

			// Проверка нажатия на область противника.
			// Спорная тема. Нужно обкатать на рабочей игре.
			/*this.enemy_area.forEach(cell => {
				if (cell[0] == x && cell[1] == y) {
					// Значит ткнул на противника.
					result = false;
				}
			});*/

			// Проверка нажатия на неигровую область не требуется, т.к. там нажатие невозможно.

			if (result) {
				// Получаем цвет ячейки на которую нажал игрок.
				var new_color = this.grid[x][y];
				
				// Цикл по массиву ячеек игрока.
				this.player_area.forEach(cell => {
					// Изменяем содержимое матрицы.
					this.changeTableCellColor(cell[0], cell[1], new_color);
					// Изменяем отображение матрицы в таблице.
					this.grid[cell[0]][cell[1]] = new_color;
					
					// Если соседняя клетка нейтральная
					this.player_area.forEach(element => {
						if (element != cell) {
							console.log('lol');
						}
					});
					
					/*
					if () {

					}
					if (this.grid[cell[0] + 1][cell[1]] == new_color && this.player_area[cell[0] + 1][cell[1]] == undefined){
						
					}*/
				});


			}
	
		} else if (turn == 'enemy') {
			// Противник ходит
		}

		return result;
	}

	getTableData() {
		var object = {
			grid: this.grid,
			player_area: this.player_area,
			enemy_area: this.enemy_area,
			player_color: this.player_color,
			enemy_color: this.enemy_color,
		}
		return object;
	}
}