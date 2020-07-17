function $(selector, container) {
    return (container || document).querySelector(selector);
}


(function() {

var _ = self.Life = function(seed) {
    this.seed = seed;
    this.height = seed.length;
    this.width = seed[0].length;

    this.prevBoard = [];
    this.board = cloneArray(seed);
};

_.prototype = {
    next: function () {
        this.prevBoard = cloneArray(this.board);

        for (var y=0; y<this.height; y++) {
            for (var x=0; x<this.width; x++) {
                var neighbors = this.aliveNeighbors(this.prevBoard, x, y);
                var alive = !!this.board[y][x];

                if (alive) {
                    if (neighbors < 2 || neighbors > 3) {
                        this.board[y][x] = 0;
                    }
                }
                else {
                    if (neighbors == 3) {
                        this.board[y][x] = 1;
                    }
                }
            }
        }
    },

    aliveNeighbors: function (array, x, y) {
        var prevRow = array[y-1] || [];
        var nextRow = array[y+1] || [];

        return [
            prevRow[x-1], prevRow[x], prevRow[x+1],
            array[y][x-1], array[y][x+1],
            nextRow[x-1], nextRow[x], nextRow[x+1]
        ].reduce(function (prev, cur) {
            return prev + +!!cur;
        }, 0);
    },

    toString: function () {
        return this.board.map(function (row) {return row.join(" "); }).join("\n");
    }
};

// Helpers
function cloneArray(array) {
    return array.slice().map(function (row) { return row.slice(); });
}

})();

(function(){

var _ = self.LifeView = function (table, size) {
    this.grid = table;
    this.size = size;
    this.started = false;
    this.autoplay = false;

    this.createGrid();
};

_.prototype = {
    createGrid: function () {
        var me = this;

        var fragment = document.createDocumentFragment();
        this.grid.InnerHTML = "";
        this.checkboxes = [];

        for (var y=0; y<this.size; y++) {
            var row = document.createElement("tr");
            this.checkboxes[y] = [];

            for (var x=0; x<this.size; x++) {
                var cell = document.createElement("td");
                var checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                this.checkboxes[y][x] = checkbox;

                cell.appendChild(checkbox);
                row.appendChild(cell);
            }

            fragment.appendChild(row);

        }
        
        this.grid.addEventListener("change", function(evt) {
            if (evt.target.nodeName.toLowerCase() == "input"){
                me.started = false;
            }

        })

        this.grid.appendChild(fragment);
    },

    get boardArray () {
        return this.checkboxes.map(function (row) {
            return row.map(function (checkbox) {
                return +checkbox.checked;
            });
        });
    },

    play: function () {
        this.game = new Life(this.boardArray);
        this.started = true;
    },

    next: function () {
        var me = this;
        if (!this.started || this.game) {
            this.play();
        }
        
        this.game.next();

        var board = this.game.board;

        for (var y=0; y<this.size; y++) {
            for (var x=0; x<this.size; x++) {
                this.checkboxes[y][x].checked = !!board[y][x];
            }
        }

        if (this.autoplay) {
            this.timer = setTimeout(function () {
                me.next();
            }, 500);
        }
    }
};

})();
//chooses size of grid and puts it on screen
var lifeView = new LifeView(document.getElementById("grid"), 12);
var lifeView1 = new LifeView(document.getElementById("grid1"), 12);
var lifeView2 = new LifeView(document.getElementById("grid2"), 12);
var lifeView3 = new LifeView(document.getElementById("grid3"), 12);
var lifeView4 = new LifeView(document.getElementById("grid4"), 12);
var lifeView5 = new LifeView(document.getElementById("grid5"), 12);
(function() {

var buttons = {
    next: $("button.next")
};

buttons.next.addEventListener("click", function() {
    lifeView.next();
    lifeView1.next();
    lifeView2.next();
    lifeView3.next();
    lifeView4.next();
    lifeView5.next();
});

$("#autoplay").addEventListener("change", function() {
    buttons.next.textContent = this.checked? "Start" : "Next";

    lifeView.autoplay = this.checked;

    if (!this.checked) {
        clearTimeout(lifeView.timer);
    }
    lifeView1.autoplay = this.checked;

    if (!this.checked) {
        clearTimeout(lifeView1.timer);
    }
    lifeView2.autoplay = this.checked;

    if (!this.checked) {
        clearTimeout(lifeView2.timer);
    }
    lifeView3.autoplay = this.checked;

    if (!this.checked) {
        clearTimeout(lifeView3.timer);
    }
    lifeView4.autoplay = this.checked;

    if (!this.checked) {
        clearTimeout(lifeView4.timer);
    }
    lifeView5.autoplay = this.checked;

    if (!this.checked) {
        clearTimeout(lifeView5.timer);
    }
});

})();