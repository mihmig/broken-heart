// Позиции фигур в пикселях (утарело)
// const initialPosition = {
//     "tile1": { x: 0,   y: 24 },
//     "tile2": { x: 144, y: 0 },
//     "tile3": { x: 24,  y: 144 },
//     "tile4": { x: 144, y: 144 },
//     "tile5": { x: 288, y: 120 },
//     "tile6": { x: 0,   y: 288 },
//     "tile7": { x: 144, y: 264 },
//     "tile8": { x: 264, y: 264 }
// };
// Позиции фигур в клетках
const initialPosition = {
    "tile1": { x: 0,   y: 1 },
    "tile2": { x: 6, y: 0 },
    "tile3": { x: 1,  y: 6 },
    "tile4": { x: 6, y: 6 },
    "tile5": { x: 12, y: 5 },
    "tile6": { x: 0,   y: 12 },
    "tile7": { x: 6, y: 11 },
    "tile8": { x: 11, y: 11 }
};

// Текущий коэффициент масштабирования (1 = исходный размер 480px)
var currentScale = 1;

// Базовые размеры в пикселях
var BASE_SIZE = 480;   // размер cover
var BASE_BOARD = 432;  // размер board
var DEFAULT_GRID_SIZE = 24;  // Размер клетки по умолчанию
var gridSize = DEFAULT_GRID_SIZE; // Может быть уменьшен
var BASE_TILE = 96;    // размер плитки

function calculateGridSize() {
    var viewportWidth = window.innerWidth  || document.documentElement.clientWidth  || document.body.clientWidth;
    var viewportHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    // берём минимальное измерение, чтобы поле целиком влезло по ширине/высоте
    var scale = Math.min(viewportWidth, viewportHeight) / BASE_SIZE;

    // на больших экранах не увеличиваем больше исходного размера
    if (scale > 1) {
        scale = 1;
    }
    gridSize = Math.round(DEFAULT_GRID_SIZE * scale);

}

function applyScale(scale) {
    var cover = document.getElementById("cover");
    var board = document.getElementById("board");
    
    var coverSize = gridSize * 20;
    var boardSize = gridSize * 18;
    var offset = gridSize;

    cover.style.width = coverSize + "px";
    cover.style.height = coverSize + "px";

    board.style.width = boardSize + "px";
    board.style.height = boardSize + "px";
    board.style.left = gridSize + "px";
    board.style.top = gridSize + "px";

    // Масштабируем размеры всех плиток (вертикальных и горизонтальных)
    var longSideSize = gridSize * 6;
    var shortSideSize = gridSize * 5;
    document.querySelectorAll(".horizontal").forEach(function (tile) {
        tile.style.width = longSideSize + "px";
        tile.style.height = shortSideSize + "px";
    });
    document.querySelectorAll(".vertical").forEach(function (tile) {
        tile.style.width = shortSideSize + "px";
        tile.style.height =  longSideSize + "px";
    });
}

function initDraggable(scale) {
    document.querySelectorAll(".tile").forEach(function (element) {
        $(element).draggable({
            grid: [gridSize, gridSize],
            containment: "#board",
            preventCollision: true,
            obstacle: $(".tile").not($(element)),
            collider: ".tile"
        });
    });
}

window.addEventListener("DOMContentLoaded", function () {
    calculateGridSize();
    applyScale(currentScale);
    initDraggable(currentScale);
    startGame();

    // При желании можно раскомментировать, чтобы при изменении размера окна всё пересчитывалось
    // window.addEventListener("resize", function () {
    //     currentScale = calculateScale();
    //     applyScale(currentScale);
    //     // Простое решение – перезагрузить страницу, чтобы переинициализировать draggable
    //     // location.reload();
    // });
});

function startGame() {
    var positions = initialPosition;
    for (var p in positions) {
        if (!positions.hasOwnProperty(p)) continue;
        var tile = document.getElementById(p);
        if (!tile) continue;
        tile.style.left = (positions[p].x * gridSize) + "px";
        tile.style.top = (positions[p].y * gridSize) + "px";
    }
}
