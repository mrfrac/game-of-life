export interface IGameOptions {
    rows: number;
    cols: number;
    color?: string;
}
export declare class Game {
    private options;
    private canvas;
    private matrix;
    constructor(elementId: string, options: IGameOptions);
    calcGeneration(): void;
    private randomize;
    private calcNeighbours;
}
