'use strict';

class Table {
  DOM_table_id;
  grid;
  player_color;
  enemy_color;
  //player_cells_counter;
  //enemy_cells_counter;

  constructor(object, table_id) {
    console.log('Инициализация объекта таблицы');

    this.DOM_table_id = table_id;
    this.grid = object.matrix;

    // Определяем цвета игроков и счёт.
    this.grid.forEach(line => {
      line.forEach(cell => {
        if (cell[1] == 1) {
          this.player_color = cell[0];
          //this.player_cells_counter++;
        }
        if (cell[1] == 2) {
          this.enemy_color = cell[0];
          //this.enemy_cells_counter++;
        }
      });
    });
  }

  generateTable() {
    // Метод собирает и вставляем DOM таблицу.
    var DOM_table = document.getElementById(this.DOM_table_id);

    //Удаляем всех потомков, на случай если они уже были.
    this.removeAllChildNodes(DOM_table);
    var matrix = this.grid;

    for (let i = 0; i < matrix.length; i++) {
      var row = document.createElement('tr');
      for (let j = 0; j < matrix[i].length; j++) {
        var cell = document.createElement('td');
        cell.setAttribute('data-x', i);
        cell.setAttribute('data-y', j);

        if (matrix[i][j][1] == 0) {
          // Если это не играбельная клетка.
          cell.className = 'neutral';
        } else {
          // Если это обычная клетка.
          // Привязываем вызов функции к клетке.
          cell.setAttribute('onclick', 'userTurn(this.dataset.x, this.dataset.y)');
          // Раскрашиваем клетку.
          // Цвета можно вынести в css, а тут просто раздавать классы.
          cell.style.backgroundColor = COLORS[matrix[i][j][0]];

          // По умолчанию клетка свободная.
          //cell.className = 'free';

          if (matrix[i][j][1] == 1) {
            // Выделение клеток из областей игрока.
            cell.className = 'player';
          } else if (matrix[i][j][1] == 2) {
            // Выделение клеток из областей противника.
            cell.className = 'enemy';
          } else if (matrix[i][j][1] == 3) {
            // Выделение свободных клеток
            cell.className = 'free';
          }

          // Выделение клеток из областей игрока.
          /*this.player_area.forEach(element => {
            if (element[0] == i && element[1] == j){
              cell.className = 'player';
            }
          });

          // Выделение клеток из областей противника.
          this.enemy_area.forEach(element => {
            if (element[0] == i && element[1] == j){
              cell.className = 'enemy';
            }
          });*/
        }

        //cell.innerText = matrix[i][j][0];
        cell.innerText = i + ' ' + j;
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
      if (this.grid[x][y][1] == 1) {
        // Значит ткнул на себя.
        console.log('warning: ' + 'ткнул на себя');
        result = false;
      }

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
        var new_color = this.grid[x][y][0];
        if (new_color == this.player_color) {
          console.log('warning: ' + 'нажал на свой цвет');
          result = false;
        }
      }

      if (result) {
        // Выбираем все ячейки игрока.
        var player_cells = [];
        for (var i = 0; i < this.grid.length; i++) {
          for (var j = 0; j < this.grid[i].length; j++) {
            if (this.grid[i][j][1] == 1)
              player_cells.push([i, j]);
          }
        }

        var free_colored_cells = [];

        // Проходим по всем клеткам игрока и выбираем свободные смежные клетки.
        // Смежной считается клетка имеющая с клеткой игрока общую грань.
        // Найденные клетки добавляем в конец массива чтобы выполнить обход и для них.
        // Цикл for...of подходит для перебора массива длинна которого увеличивается во время выполнения цикла.
        var counter = 0;
        for (var cell of player_cells) {
          // Противорекурсин. Одна заглушка.
          counter++;
          if (counter > 50)
            return 0;

          var i = cell[0];
          var j = cell[1];
          var width = this.grid.length;
          var height = this.grid[0].length;
          console.log(cell);

          if (i + 1 >= 0 && i + 1 < width && j >= 0 && j < height && this.grid[i + 1][j][0] == new_color && this.grid[i + 1][j][1] == 3) {
            //console.log('bottom');
            // Если элемент уникальный - добавляем.
            if (!this.isContained(player_cells, [i + 1, j]))
              player_cells.push([i + 1, j]);
            free_colored_cells.push([i + 1, j]);
          }
          if (i - 1 >= 0 && i - 1 < width && j >= 0 && j < height && this.grid[i - 1][j][0] == new_color && this.grid[i - 1][j][1] == 3) {
            //console.log('top');
            // Если элемент уникальный - добавляем.
            if (!this.isContained(player_cells, [i - 1, j]))
              player_cells.push([i - 1, j]);
            free_colored_cells.push([i - 1, j]);
          }
          if (i >= 0 && i < width && j + 1 >= 0 && j + 1 < height && this.grid[i][j + 1][0] == new_color && this.grid[i][j + 1][1] == 3) {
            //console.log('right');
            // Если элемент уникальный - добавляем.
            if (!this.isContained(player_cells, [i, j + 1]))
              player_cells.push([i, j + 1]);
            free_colored_cells.push([i, j + 1]);
          }
          if (i >= 0 && i < width && j - 1 >= 0 && j - 1 < height && this.grid[i][j - 1][0] == new_color && this.grid[i][j - 1][1] == 3) {
            //console.log('left');
            // Если элемент уникальный - добавляем.
            if (!this.isContained(player_cells, [i, j - 1]))
              player_cells.push([i, j - 1]);
            free_colored_cells.push([i, j - 1]);
          }
        }

        // Удаляем повторяющиеся элементы из массива.
        free_colored_cells = this.uniqueArray(free_colored_cells);
        console.log(free_colored_cells);

        if (free_colored_cells.length == 0) {
          console.log('warning: ' + 'нет подходящих клеток для захвата');
          result = false;
        }
      }

      // Собственно перекраска и присвоение области 
      if (result) {
        // Переприсваиваем выбранные клетки.
        free_colored_cells.forEach(cell => {
          var i = cell[0];
          var j = cell[1];
          this.grid[i][j][1] = 1;
        });

        // Перекрашиваем клетки игрока.
        player_cells.forEach(cell => {
          var i = cell[0];
          var j = cell[1];
          this.grid[i][j][0] = new_color;
        });

        this.player_color = new_color;
        this.generateTable();
      }

    } else if (turn == 'enemy') {
      // Противник ходит
    }

    return result;
  }

  // Возвращает все данные таблицы.
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

  // Возвращает массив без повторяющихся элементов.
  uniqueArray(arr) {
    let res = [];
    for (let a of arr) {
      var find = false;

      for (let b of res)
        if (a[0] == b[0] && a[1] == b[1])
          find = true;

      if (!find)
        res.push(a);
    }
    return res;
  }

  // Проверка на содержание подмассива в массиве.
  isContained(arr, obj) {
    // Если arr содержит obj - возвращает true, иначе - false.
    var res = false;
    arr.forEach(a => {
      if (a[0] == obj[0] && a[1] == obj[1])
        res = true;
    });
    return res;
  }

  // Удаляет всех потомков DOM элемента.
  removeAllChildNodes(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }

  // Возвращает счёт игры.
  getScore() {
    var result = {
      player_score: 0,
      enemy_score: 0
    }

    this.grid.forEach(line => {
      line.forEach(cell => {
        if (cell[1] == 1) {
          result.player_score++;
        }
        if (cell[1] == 2) {
          result.enemy_score++;
        }
      });
    });

    return result;
  }

  // Определяет завершена ли игра.
  isGameOver() {
    var result = true;
    
    // Простая проверка на наличие свободных клеток.
    // Это временная мера.
    this.grid.forEach(line => {
      line.forEach(cell => {
        if (cell[1] == 3) {
          result = false;
        }
      });
    });

    return result;
  }
}