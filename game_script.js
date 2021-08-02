'use strict';

var table = null;

var OWNERS = {
  0: 'none',
  1: 'player',
  2: 'enemy',
  3: 'free'
}

// Цвета должны быть адаптивными к входящему объекту.
// Или нет XD
var COLORS = {
  0: 'grey',
  1: 'rgb(255, 0, 0)', // red
  2: 'orange',
  3: 'yellow',
  4: 'blue',
  5: 'green',
  6: 'MediumVioletRed',
}

function getGridObject() {
  // Функция должна отдавать готовую играбельную таблицу.

  //[color,owner]
  var myMatrix =
    [
      /*
      [[1,1], [6,3], [3,3], [3,3], [5,3], [4,3]],
      [[2,3], [1,1], [5,3], [6,3], [3,3], [4,3]],
      [[4,3], [4,3], [2,3], [5,3], [1,3], [4,3]],
      [[2,3], [4,3], [4,3], [4,3], [4,3], [4,3]],
      [[1,3], [3,3], [4,3], [3,3], [4,3], [4,3]],
      */
      /*
      [[1, 1], [1, 1], [0, 0], [0, 0], [1, 3], [2, 3], [1, 3], [4, 3], [5, 3], [2, 3]],
      [[1, 1], [1, 1], [0, 0], [0, 0], [6, 3], [3, 3], [2, 3], [3, 3], [6, 3], [1, 3]],
      [[2, 3], [4, 3], [0, 0], [0, 0], [5, 3], [4, 3], [4, 0], [4, 0], [3, 3], [4, 3]],
      [[4, 3], [3, 3], [0, 0], [0, 0], [2, 3], [1, 3], [4, 0], [4, 0], [2, 3], [5, 3]],
      [[2, 3], [5, 3], [0, 0], [0, 0], [3, 3], [6, 3], [4, 0], [4, 0], [1, 3], [6, 3]],
      [[1, 3], [2, 3], [4, 3], [3, 3], [2, 3], [5, 3], [4, 0], [4, 0], [4, 2], [4, 2]],
      [[3, 3], [5, 3], [1, 3], [2, 3], [1, 3], [4, 3], [4, 0], [4, 0], [4, 2], [4, 2]],
      */
      
      [[1, 1], [1, 1], [3, 3], [3, 3], [5, 3], [4, 3]],
      [[1, 1], [1, 1], [0, 0], [0, 0], [3, 3], [1, 3]],
      [[4, 3], [3, 3], [0, 0], [0, 0], [1, 3], [3, 3]],
      [[2, 3], [5, 3], [0, 0], [0, 0], [4, 2], [4, 2]],
      [[1, 3], [3, 3], [4, 3], [3, 3], [4, 2], [4, 2]],
      
    ];

  var randX = 10;
  var randY = 10;
  var randMatrix = new Array(randX);
  for (var i = 0; i < randX; i++) {
    randMatrix[i] = new Array(randY);
    for (var j = 0; j < randY; j++) {
      //randMatrix[i][j] = Math.floor(Math.random() * (7-1) + 1);
      randMatrix[i][j] = [1, 0];
    }
  }

  //console.log(randMatrix);
  //console.log(JSON.stringify(randMatrix));

  var object = {
    // Матрица цветов клеток.
    matrix: myMatrix,
  };

  return object;
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
  if (table.changeAreaColor(x, y, 'player')) {
    console.log('Игрок походил');
    
    checkGameOver()
    enemyTurn();
  }
  else {
    console.log('низя так ходить');
  }
}

function enemyTurn() {
  console.log('Ход противника...');
  if (Enemy.turn(table)) {
    console.log('Противник походил');
  } else {
    console.log('Противник не может походить 0_o');
  }

  checkGameOver();
}

function sleep(ms) {
  ms += new Date().getTime();
  while (new Date() < ms){}
}

// Выводит в span инфу о счёте игроков.
function updateScore() {
  var playerSpan = document.getElementById('player_score');
  var enemySpan = document.getElementById('enemy_score');

  var score = table.getScore();

  playerSpan.innerHTML = score.player_score;
  enemySpan.innerHTML = score.enemy_score;
}

// Проверка окончания игры и уведомление об окончании.
function checkGameOver() {
  updateScore();
  // Задержка какая-то залипает последнее нажатие игрока.
  if(table.isGameOver()) {
    alert('GAME OVER');
  }
}

function main() {
  // Создаём объект класса таблица таблица.
  table = new Table(getGridObject(), 'grid');

  // Вставляем табицу в страницу.
  table.generateTable();

  // Выводим начальный счёт.
  updateScore();

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