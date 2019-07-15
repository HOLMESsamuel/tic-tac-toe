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

    AIturn() {

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                var cell = cell = $(`.col[data-col='${i}'][data-row='${j}']`);
                if (cell.hasClass("empty")) {
                    cell.html((this.player === 'O') ? "X" : "O");
                    cell.addClass((this.player === 'O') ? "X" : "O");
                    cell.removeClass("empty");
                    if (this.checkForWinner(j, i, (this.player === 'O') ? "X" : "O")) {
                        $(this.selector).off("click");
                        this.gameNumber = 0;
                        console.log("AI");
                    }
                    return "done";
                }
            }
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
                that.gameNumber = 0;
                console.log("player");
            }
            if (that.mode == "AI") {
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
        $grid.createGrid();
        symbol = $('input[name=inlineRadioOptions2]:checked').val();
        if ($('input[name=inlineRadioOptions1]:checked').val() == "AI") {
            $grid.setMode("AI", symbol);
        } else {
            $grid.setMode("2players", symbol);
        }
        if ($grid.gameNumber == 0) {
            $grid.createEventListeners();
            $grid.gameNumber += 1;
        }
    });
});