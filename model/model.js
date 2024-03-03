"use-strict";

export let model = [];

export function createModel(GRID_ROWS, GRID_COLS){
    const tempModel = [];
    for(let i = 0; i < GRID_ROWS; i++){
        const row = [];
        for(let j = 0; j < GRID_COLS; j++){
            const cell = 0; 
            row.push(cell);
        }
        tempModel.push(row);
    }
    model = tempModel;
};

export function changeModelRow(GRID_ROWS, col, currentPlayer){
    if(model[GRID_ROWS-1][col] === 0){
        model[GRID_ROWS-1][col] = currentPlayer;
        return { row: GRID_ROWS - 1, col: col };
    }
    for(let i = 0; i <= GRID_ROWS-1; i++){
        if(model[i][col] !== 0 && i > 0){
            model[i-1][col] = currentPlayer;
            return { row: i - 1, col: col };
        }
    };
};

export function checkForWin(){
    // number of rows - amount of rows
    const rowCount = model.length;
    // number of columns - length of a row
    const colCount = model[0].length;
    // loop through each cell in the model
    for (let i = 0; i < rowCount; i++) {
        for (let j = 0; j < colCount; j++) {
            // check if the current cell is 0
            if (model[i][j] !== 0) {
                // horizontal
                if (j <= colCount - 4 &&
                    model[i][j] === model[i][j + 1] &&
                    model[i][j] === model[i][j + 2] &&
                    model[i][j] === model[i][j + 3]) {
                    return true;
                }
                // vertical
                if (i <= rowCount - 4 &&
                    model[i][j] === model[i + 1][j] &&
                    model[i][j] === model[i + 2][j] &&
                    model[i][j] === model[i + 3][j]) {
                    return true;
                }
                // top left bottom right
                if (i <= rowCount - 4 && j <= colCount - 4 &&
                    model[i][j] === model[i + 1][j + 1] &&
                    model[i][j] === model[i + 2][j + 2] &&
                    model[i][j] === model[i + 3][j + 3]) {
                    return true;
                }
                // top right bottom left
                if (i <= rowCount - 4 && j >= 3 &&
                    model[i][j] === model[i + 1][j - 1] &&
                    model[i][j] === model[i + 2][j - 2] &&
                    model[i][j] === model[i + 3][j - 3]) {
                    return true;
                }
            }
        }
    }
    return false;
}
const availableCells = [];

export function availableCellsChecker(GRID_ROWS, GRID_COLS) {
    availableCells.length = 0; 
    for (let i = 0; i < GRID_ROWS-1; i++) {
        for (let j = 0; j < GRID_COLS-1; j++) {
            if (model[i][j] === 0) {
                availableCells.push([i, j]); 
            }
        }
    }
    return availableCells;
}