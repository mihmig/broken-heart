const initialPosition = {
    "tile1":{x:0,   y:24},
    "tile2":{x:144, y:0},
    "tile3":{x:24,  y:144},
    "tile4":{x:144, y:144},
    "tile5":{x:288, y:120},
    "tile6":{x:0,   y:288},
    "tile7":{x:144, y:264},
    "tile8":{x:264, y:264}
};


window.addEventListener('DOMContentLoaded', function() {

    document.querySelectorAll(".tile")
        .forEach(function(element) {
            $(element).draggable({
                grid: [ 24, 24 ],
                containment: "#board",
                preventCollision: true,
                obstacle: $(".tile").not($(element)),
                collider: ".tile"
            });
    });
    startGame();
});

function startGame() {
    var positions = initialPosition;
    for(p in positions) {
        const tile = document.getElementById(p);
        tile.style.left = positions[p].x + "px";
        tile.style.top = positions[p].y + "px";
    }

}
