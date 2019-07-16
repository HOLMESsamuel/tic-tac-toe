class grid {
    constructor(selector) {
        this.ROWS = 3;
        this.COLS = 3;
        this.selector = selector;
        this.player = "X";
        this.createGrid();
        this.gameNumber = 0;
    }

    setMode(mode, symbol) {
        this.mode = mode;
        this.player = symbol;
    }



    checkForWinner(row, col, player) {
        if (row == 0 && col == 0) {
            const cell1 = $(`.col[data-col='${1}'][data-row='${1}']`);
            if (cell1.hasClass(player)) {
                const cell2 = $(`.col[data-col='${2}'][data-row='${2}']`);
                if (cell2.hasClass(player)) {
                    return true;
                }
            }

        }
        if (row == 0 && col == 2) {
            const cell1 = $(`.col[data-col='${1}'][data-row='${1}']`);
            if (cell1.hasClass(player)) {
                const cell2 = $(`.col[data-col='${0}'][data-row='${2}']`);
                if (cell2.hasClass(player)) {
                    return true;
                }
            }
        }
        if (row == 2 && col == 0) {
            const cell1 = $(`.col[data-col='${1}'][data-row='${1}']`);
            if (cell1.hasClass(player)) {
                const cell2 = $(`.col[data-col='${2}'][data-row='${0}']`);
                if (cell2.hasClass(player)) {
                    return true;
                }
            }
        }
        if (row == 2 && col == 2) {
            const cell1 = $(`.col[data-col='${1}'][data-row='${1}']`);
            if (cell1.hasClass(player)) {
                const cell2 = $(`.col[data-col='${0}'][data-row='${0}']`);
                if (cell2.hasClass(player)) {
                    return true;
                }
            }
        }
        const colCells = $(`.col[data-col='${col}']`);
        var n = 0;
        for (let i = 0; i < colCells.length; i++) {
            const $cell = $(colCells[i]);
            if ($cell.hasClass(player)) {
                n += 1;
            }
        }
        if (n == 3) {
            return true;
        }
        const rowCells = $(`.col[data-row='${row}']`);
        var n = 0;
        for (let i = 0; i < rowCells.length; i++) {
            const $cell = $(rowCells[i]);
            if ($cell.hasClass(player)) {
                n += 1;
            }
        }
        if (n == 3) {
            return true;
        }
        return false;
    }

    freeCells() {
        var freeCells = [];
        for (let row = 0; row < this.ROWS; row++) {
            for (let col = 0; col < this.COLS; col++) {
                var cell = $(`.col[data-col='${col}'][data-row='${row}']`);
                if (cell.hasClass("empty")) {
                    freeCells.push(cell);
                }
            }
        }
        return freeCells;
    }

    evaluateScore() {

    }

    AIturn() {
        const cells = this.freeCells();
        const n = cells.length
        if (n == 0) {
            return "done";
        }
        const choice = Math.floor(Math.random() * n);
        const cell = cells[choice];
        cell.html((this.player === 'O') ? "X" : "O");
        cell.addClass((this.player === 'O') ? "X" : "O");
        cell.removeClass("empty");
        const row = cell.data("row");
        const col = cell.data("col");
        if (this.checkForWinner(row, col, (this.player === 'O') ? "X" : "O")) {
            $(this.selector).off("click");
            console.log("AI");
        }
    }

    createGrid() {
        const $board = $(this.selector);
        for (let row = 0; row < this.ROWS; row++) {
            const $row = $('<div>').addClass('row');
            for (let col = 0; col < this.COLS; col++) {
                const $col = $('<div>').addClass("col").addClass("empty").attr('data-row', row).attr('data-col', col);
                $row.append($col)
            }
            $board.append($row);
        }
    }

    createEventListeners() {
        var $board = $(this.selector);
        const that = this; //that will be used as this in the following functions

        $board.on('click', '.col.empty', function() {
            var row = $(this).data("row");
            var col = $(this).data("col");
            $(this).html(that.player);
            $(this).addClass(that.player);
            $(this).removeClass("empty");
            if (that.checkForWinner(row, col, that.player)) {
                $board.off("click");
                console.log("player");
            } else if (that.mode == "AI") {
                that.AIturn();
            } else {
                that.player = (that.player === 'O') ? "X" : "O";
            }


        });
    }
}

$(document).ready(function() {
    $grid = new grid("#tic-tac-toe");
    $("#begin").click(function() {
        $("#tic-tac-toe").empty();
        $("#tic-tac-toe").off("click");
        $grid.createGrid();
        symbol = $('input[name=inlineRadioOptions2]:checked').val();
        if ($('input[name=inlineRadioOptions1]:checked').val() == "AI") {
            $grid.setMode("AI", symbol);
        } else {
            $grid.setMode("2players", symbol);
        }

        $grid.createEventListeners();
        if ($grid.mode == "AI" && Math.random() > 0.5) {
            $grid.AIturn();
        }


    });
});