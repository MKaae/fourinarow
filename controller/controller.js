'use-strict';

import { createModel, changeModelRow, checkForWin, availableCellsChecker } from "../model/model.js";
import { makeBoardClickAble, createView, updateView, playerWin, disableBoard, enableBoard } from "../view/view.js";

export const GRID_ROWS = 6;
export const GRID_COLS = 7;
let currentPlayer = 1;

export function start(){
    createModel(GRID_ROWS, GRID_COLS);
    createView(GRID_ROWS, GRID_COLS);
    makeBoardClickAble();
}

export function selectCol(col){
    const cell = changeModelRow(GRID_ROWS, col, currentPlayer);
    updateView(cell, GRID_COLS, currentPlayer);
    nextTurn();
}

function nextTurn(){
    const win = checkForWin();
    if(win){
        playerWin(currentPlayer);
        return;
    }
    if(currentPlayer === 1){
        disableBoard();
        setTimeout(()=> {
            computerTurn();
        }, 1000);
        currentPlayer = 2;
    } else if(currentPlayer === 2){
        currentPlayer = 1;
    };
}

function computerTurn(){
    const availableCells = availableCellsChecker(GRID_ROWS, GRID_COLS);
    if (availableCells.length === 0){
        return;
    } else {
        const index = Math.floor(Math.random() * availableCells.length);
        const [row, col] = availableCells[index];
        selectCol(col);
        enableBoard();
    }
}


