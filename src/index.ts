export type CellType = 0 | 1;

export interface IGameOptions extends ICanvasOptions {
    seed?: Array<CellType[]>
}

export interface ICanvasOptions {
    rows: number;
    cols: number;
    color?: string;
}

export class Game {
    private options: IGameOptions;
    private canvas: Canvas;
    private matrix: Array<CellType[]>;

    public constructor(elementId: string, options: IGameOptions) {
        this.options = options;
        this.canvas = new Canvas(elementId, {
            rows: this.options.rows,
            cols: this.options.cols,
            color: this.options.color,
        });

        if (this.options.seed) {
            this.matrix = this.options.seed;
        } else {
            this.matrix = [];
            this.randomize();
        }

        this.canvas.draw(this.matrix);
    }

    public liveOut(): Array<CellType[]> {
        const newGeneration: Array<CellType[]> = JSON.parse(JSON.stringify(this.matrix));

        for (let i = 0; i < this.options.cols; i++) {
            for (let j = 0; j < this.options.rows; j++) {
                const n = this.calcNeighbours(i, j);
                if (!this.matrix[i][j] && n === 3) newGeneration[i][j] = 1;
                if (this.matrix[i][j] && (n < 2 || n > 3)) newGeneration[i][j] = 0;
            }
        }

        this.matrix = newGeneration;
        this.canvas.draw(newGeneration)
        return newGeneration;
    }

    private randomize(): void {
        for (let i = 0; i < this.options.cols; i++) {
            for (let j = 0; j < this.options.rows; j++) {
                if (!this.matrix[i]) this.matrix[i] = Array(this.options.cols);
                this.matrix[i][j] = Math.random() >= 0.5 ? 1 : 0;
            }
        }
    }

    private calcNeighbours(x: number, y: number): number {
        const getCellVall = (xx: number, yy: number): number => {
            if (xx < 0) xx = this.options.cols - 1;
            if (xx >= this.options.cols) xx = 0;
            if (yy < 0) yy = this.options.rows - 1;
            if (yy >= this.options.rows) yy = 0;

            return this.matrix[xx][yy];
        };

        return [
            getCellVall(x - 1, y - 1), getCellVall(x, y - 1), getCellVall(x + 1, y - 1),
            getCellVall(x - 1, y), getCellVall(x + 1, y),
            getCellVall(x - 1, y + 1), getCellVall(x, y + 1), getCellVall(x + 1, y + 1)
        ].reduce((a, b) => a + b, 0);
    }
}

class Canvas {
    private canvas: HTMLCanvasElement;
    private options: ICanvasOptions;
    private ctx: CanvasRenderingContext2D | null;

    public constructor(elementId: string, options: ICanvasOptions) {
        this.canvas = document.getElementById(elementId) as HTMLCanvasElement;
        this.options = options;
        this.ctx = this.canvas.getContext("2d");
    }

    public draw(data: number[][]) {
        if (!this.ctx) {
            throw new Error("Can't get 2d context of canvas");
        }

        const canvasWidth: number = parseInt(this.canvas.getAttribute("width") || "100", 10);
        const canvasHeight: number = parseInt(this.canvas.getAttribute("height") || "100", 10);
        
        this.ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        const cellWidth = canvasWidth / this.options.cols;
        const cellHeight = canvasHeight / this.options.rows;

        this.ctx.strokeStyle = this.ctx.fillStyle = this.options.color ? this.options.color : "#d0b3d1";
        for (let i = 0; i < this.options.cols; i++) {
            for (let j = 0; j < this.options.rows; j++) {
                if (data[i][j]) this.ctx.fillRect(i * cellWidth, j * cellHeight, cellWidth, cellHeight)
            }
        }
    }
}
