class Game {
    constructor(elementId, cols, rows) {
        this.cols = cols;
        this.rows = rows;
        this.canvas = new Canvas(elementId, cols, rows);
        
        this.data = [];
        this.randomize();

        this.canvas.draw(this.data);
/*         console.log(
        this.calcNeigbours(9, 9),
        this.calcNeigbours(0,9),
        ) */

        //this.calcNeigbours(2,1)

        //this.play();
    }

    randomize() {
        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                if (!this.data[i]) this.data[i] = Array(this.cols);
                if (!this.data[i][j]) this.data[i][j] = Array(this.rows);
                this.data[i][j] = Math.random() >= 0.5 ? 1 : 0;
            }
        }

     /*    this.data[2][2] = 1
        this.data[2][3] = 1
        this.data[3][2] = 1
        this.data[3][3] = 1 */

        this.data[2][6] = 1
        this.data[3][7] = 1
        this.data[4][7] = 1
        this.data[4][6] = 1
        this.data[4][5] = 1
        //console.log(this.data);
    }

    play() {
        const data = JSON.parse(JSON.stringify(this.data));
/*         for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                if (!data[i]) data[i] = Array(this.cols);
                if (!data[i][j]) data[i][j] = Array(this.rows);
                data[i][j] = 0; //Math.random() >= 0.5 ? 1 : 0;
            }
        } */
        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                const n = this.calcNeigbours(i, j);
                if (!this.data[i][j] && n === 3) data[i][j] = 1;
                if (this.data[i][j] && (n < 2 || n > 3)) data[i][j] = 0;
            }
        }
        this.data = data;

        //setTimeout(() => {
            this.canvas.draw(data)
        //}, 2000);
    }

    calcNeigbours(x, y) {
        const val = (xx, yy) => {
            if (xx < 0) xx = this.cols - 1;
            if (xx >= this.cols) xx = 0;
            if (yy < 0) yy = this.rows - 1;
            if (yy >= this.rows) yy = 0;

            return this.data[xx][yy];
        };
        
        return [val(x - 1, y - 1), val(x, y - 1), val(x + 1, y - 1),
            val(x - 1, y), val(x + 1, y),
            val(x - 1, y + 1), val(x, y + 1), val(x + 1, y + 1)].reduce((a, b) => a + b, 0);
    }
}

class Canvas {
    constructor(elementId, cols, rows) {
        this.elementId = elementId;
        this.cols = cols;
        this.rows = rows;
        this.canvas = document.getElementById(this.elementId);
        this.ctx = this.canvas.getContext("2d");
    }

    draw(data) {

        
        const canvasWidth = parseInt(this.canvas.getAttribute("width"), 10);
        const canvasHeight = parseInt(this.canvas.getAttribute("height"), 10);
        
        this.ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        const cellWidth = parseInt(canvasWidth / this.cols, 10);
        const cellHeight = parseInt(canvasHeight / this.rows, 10);
    
    
        this.ctx.strokeStyle = this.ctx.fillStyle =  "#f1f1f1d1";
        //this.ctx.font = "20px serif"
        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                //this.ctx.strokeRect(i * cellWidth, j * cellHeight, cellWidth, cellHeight);
                
                if (data[i][j]) this.ctx.fillRect(i * cellWidth, j * cellHeight, cellWidth, cellHeight)
                //this.ctx.fillStyle = "red";
                //this.ctx.fillText(`${i},${j}`, i * cellWidth + 20, j * cellHeight + 20);
                //this.ctx.fillStyle = this.ctx.strokeStyle;
            }
        }
    
    }
}

