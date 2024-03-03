'use-strict';
import { selectCol, start, GRID_COLS } from "../controller/controller.js";

window.addEventListener('DOMContentLoaded', start)

let board = document.getElementById('board');

export function createView(GRID_ROWS, GRID_COLS){
    const board = document.getElementById("board");
    board.style.setProperty("--GRID_COLS", GRID_COLS);
    for(let row = 0; row < GRID_ROWS; row++){
        for(let col = 0; col < GRID_COLS; col++){
            const cell = document.createElement("div");
            cell.classList.add("cell");
            board.appendChild(cell);
        }
    }
}

export function makeBoardClickAble(){
    board.addEventListener('click', boardClicked)
}

function boardClicked(){
    const cell = event.target;
    const cells = cell.parentNode.children;
    const index = Array.from(cells).indexOf(cell);
    if(cell.classList.contains("cell")){
        const col = index % GRID_COLS;
        selectCol(col);
    };
}

export function updateView(cell, GRID_COLS, currentplayer){
    const row = cell.row;
    const col = cell.col;
    const index = row * GRID_COLS + col;
    const cells = document.getElementById('board').children;
    const targetCell = cells[index];
    if(currentplayer === 1){
        targetCell.style.backgroundColor = "red";
    } else {
        targetCell.style.backgroundColor = "blue";
    }
}
export function playerWin(currentPlayer){
    if(currentPlayer === 1){
        const win = document.getElementById("win");
        win.style.color = "red";
        win.textContent = `Red player wins the game.`
    } else {
        const win = document.getElementById("win");
        win.style.color = "blue";
        win.textContent = `Blue player wins the game.`
    }
    board.removeEventListener('click', boardClicked);
}
export function disableBoard() {
    board.removeEventListener('click', boardClicked);
}

export function enableBoard() {
    board.addEventListener('click', boardClicked);
}