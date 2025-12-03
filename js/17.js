var initialPosition = {
    "tile0":{x:0,   y:24},
    "tile1":{x:144, y:0},
    "tile2":{x:24,  y:144},
    "tile3":{x:144, y:144},
    "tile4":{x:288, y:120},
    "tile5":{x:0,   y:288},
    "tile6":{x:144, y:264},
    "tile7":{x:264, y:264}
};
var tiles = {};
var boundingBoxes = [];

function init() {
    // window.addEventListener('DOMContentLoaded', function() {
    // }, false);
    var tiles = document.querySelectorAll("img.tile");
    tiles.forEach(function(tile) {
        var draggie = new Draggabilly( tile, {
            grid: [ 24, 24 ]
        });
        draggie.on("dragEnd",recalculateBoundingBoxes);
    });

    startGame();
//    savePosition();
}

function createBoundingBoxes() {

}
function recalculateBoundingBoxes(event, pointer, moveVector) {
    console.log('recalculate');
}

function dragEndHandler(event, pointer) {
    savePosition();
    recalculateBoundingBoxes();
}
function startGame() {
    var positions = initialPosition;
    for(p in positions) {
        var tile = document.getElementById(p);
        tiles[p] = tile;
        tile.style.left = positions[p].x + "px";
        tile.style.top = positions[p].y + "px";
    }

}
function savePosition() {
    for(t in tiles) {
        console.log(t);
        // var tile = document.getElementById("tile" + i);
        // tilePositions[i] = {
        //     x: tile.style.left.replaceAll(/\D/g, ''),
        //     y: tile.style.top.replaceAll(/\D/g, ''),
        // }
    }
}
function printPositions() {
    document.querySelectorAll('img.tile');
    tiles.forEach(function(tile) {
        console.log('{x:' + tile.style.left + ', y:' + tile.style.top + '},');
    });
}
function createContainmentDivs() {

}