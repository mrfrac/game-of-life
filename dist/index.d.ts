export declare type CellType = 0 | 1;
export interface IGameOptions extends ICanvasOptions {
    seed?: Array<CellType[]>;
}
export interface ICanvasOptions {
    rows: number;
    cols: number;
    color?: string;
}
export declare class Game {
    private options;
    private canvas;
    private matrix;
    constructor(elementId: string, options: IGameOptions);
    liveOut(): Array<CellType[]>;
    private randomize;
    private calcNeighbours;
}
