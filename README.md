[![dependencies Status](https://david-dm.org/mrfrac/game-of-life/status.svg)](https://david-dm.org/mrfrac/game-of-life)

# Conway's Game of Life

Simple realization of Game of Life.

You can play it [here](https://mrfrac.github.io/game-of-life/dist/).

## Usage example

You can see it [here](https://github.com/mrfrac/game-of-life/blob/master/dist/index.html).

### Canvas 
```html
<canvas id="gameCanvas" width="800" height="400"></canvas>
```

### JavaScript
Somewhere in `html>head`:
```html
<script src="./game-of-life.umd.js"></script>
```

Somewhere in JS code:
```js
const params = {
    cols: 400, // matrix size: 400x400
    rows: 400,
    color: "gray"
};

let game = new GameOfLife.Game("gameCanvas", params);
let gameStarted = undefined;

function play() {
    if (!gameStarted) gameStarted = 1;
    playGame();
}

function playGame() {
    if (!gameStarted) return;
    game.liveOut();
    window.requestAnimationFrame(playGame)
}

function reset() {
    pause();
    params.color = '#' + (function lol(m, s, c) {
        return s[m.floor(m.random() * s.length)] + (c && lol(m, s, c - 1));
    })(Math, '0123456789ABCDEF', 4);
    game = new GameOfLife.Game("gameCanvas", params);
}

function pause() {
    gameStarted = undefined;
}
```

Thanks for your attention ;)
