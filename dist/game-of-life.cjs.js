'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Game = /** @class */ (function () {
    function Game(elementId, options) {
        this.options = options;
        this.canvas = new Canvas(elementId, this.options);
        this.matrix = [];
        this.randomize();
        this.canvas.draw(this.matrix);
    }
    Game.prototype.calcGeneration = function () {
        var newGeneration = JSON.parse(JSON.stringify(this.matrix));
        for (var i = 0; i < this.options.cols; i++) {
            for (var j = 0; j < this.options.rows; j++) {
                var n = this.calcNeighbours(i, j);
                if (!this.matrix[i][j] && n === 3)
                    newGeneration[i][j] = 1;
                if (this.matrix[i][j] && (n < 2 || n > 3))
                    newGeneration[i][j] = 0;
            }
        }
        this.matrix = newGeneration;
        this.canvas.draw(newGeneration);
    };
    Game.prototype.randomize = function () {
        for (var i = 0; i < this.options.cols; i++) {
            for (var j = 0; j < this.options.rows; j++) {
                if (!this.matrix[i])
                    this.matrix[i] = Array(this.options.cols);
                //if (!this.matrix[i][j]) this.matrix[i][j] = 
                this.matrix[i][j] = Math.random() >= 0.5 ? 1 : 0;
            }
        }
    };
    Game.prototype.calcNeighbours = function (x, y) {
        var _this = this;
        var val = function (xx, yy) {
            if (xx < 0)
                xx = _this.options.cols - 1;
            if (xx >= _this.options.cols)
                xx = 0;
            if (yy < 0)
                yy = _this.options.rows - 1;
            if (yy >= _this.options.rows)
                yy = 0;
            return _this.matrix[xx][yy];
        };
        return [val(x - 1, y - 1), val(x, y - 1), val(x + 1, y - 1),
            val(x - 1, y), val(x + 1, y),
            val(x - 1, y + 1), val(x, y + 1), val(x + 1, y + 1)].reduce(function (a, b) { return a + b; }, 0);
    };
    return Game;
}());
var Canvas = /** @class */ (function () {
    function Canvas(elementId, options) {
        this.canvas = document.getElementById(elementId);
        this.options = options;
        this.ctx = this.canvas.getContext("2d");
    }
    Canvas.prototype.draw = function (data) {
        if (!this.ctx) {
            throw new Error("Can't get 2d context of canvas");
        }
        var canvasWidth = parseInt(this.canvas.getAttribute("width") || "100", 10);
        var canvasHeight = parseInt(this.canvas.getAttribute("height") || "100", 10);
        this.ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        var cellWidth = canvasWidth / this.options.cols;
        var cellHeight = canvasHeight / this.options.rows;
        this.ctx.strokeStyle = this.ctx.fillStyle = this.options.color ? this.options.color : "#d0b3d1";
        for (var i = 0; i < this.options.cols; i++) {
            for (var j = 0; j < this.options.rows; j++) {
                if (data[i][j])
                    this.ctx.fillRect(i * cellWidth, j * cellHeight, cellWidth, cellHeight);
            }
        }
    };
    return Canvas;
}());

exports.Game = Game;
