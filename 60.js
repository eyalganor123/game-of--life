/*game of life

*/

'use strict'


console.log('%cEx. #60 Solution:\n', 'color:orange');

var gRounds = 1
var gGameInterval;
var gRowSize = 5;
var gColSize = 8;
var gBoard = createBoard(gRowSize, gColSize);
init()

function init() {
    populateInital(1);
    console.table(gBoard)
    gGameInterval = setInterval(function () {
        play();
        gRounds++;
        if (checkAllDead()){clearInterval(gGameInterval)}
    }, 1000);
}

function createBoard(rowSize, colSize) {
    var board = [];
    var rowSize = rowSize;
    var colSize = colSize;
    for (var i = 0; i < rowSize; i++) {
        board[i] = [];
        for (var j = 0; j < colSize; j++) {
            board[i][j] = ''
        }
    }


    return board;
}

function populateInital(density) {

    var board = gBoard;
    var popDensity = density
    for (var i = 0; i < board.length; i++) {
        var row = board[i];
        for (var j = 0; j < row.length; j++) {
            var cell = row[j];
            var randomInt = Math.random();
            if (randomInt < popDensity) board[i][j] = 'X';
        }
    }
    // console.table(gBoard);
}

function runGeneration(board) {
    var copyMat = JSON.parse(JSON.stringify(board));
    var pos = {
        i: 1,
        j: 5
    };
    for (var i = 0; i < copyMat.length; i++) {
        var row = copyMat[i];
        for (var j = 0; j < row.length; j++) {
            var cell = row[j];
            pos = {
                i: i,
                j: j
            }
            if (countPeopleAround(pos) < 3 || countPeopleAround(pos) < 5) copyMat[i][j] = '';
            else if (cell === '') copyMat[i][j] = 'X';

        }

    }
    // console.table(copyMat);
    gBoard = copyMat;


    return copyMat
}

function play() {
    gBoard = runGeneration(gBoard);
    // console.clear();
    console.table((gBoard));
}

function countPeopleAround(pos) {
    var peopleCount = 0;
    for (var i = pos.i - 1; i <= pos.i + 1; i++) {
        // if i is out of bounderies - go to the next i 
        if (i < 0 || i > gBoard.length - 1) continue; //continue to the next i 

        for (var j = pos.j - 1; j <= pos.j + 1; j++) {
            // if j is out of bounderies - go to the next j:
            if (j < 0 || j > gBoard[0].length - 1) continue; // continue to the next j.

            if (i === pos.i && j === pos.j) continue; //if its users cell continue;
            if (gBoard[i][j] === 'X') peopleCount++;
        }
    }
    return peopleCount;
}
function checkAllDead(){return true}