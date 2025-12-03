var draggie;

function init() {
    var board = document.getElementById('board');
    var a = document.getElementById('A');
    var b = document.getElementById('B');
        b.style.left = "144px";
    var c = document.getElementById('C');
        c.style.top = "144px";
    var d = document.getElementById('D');
        d.style.left = "144px";
        d.style.top = "144px";
    var figs = document.querySelectorAll('.figure');
    draggie = new Draggabilly( a, {
        grid: [ 24, 24 ],
        containment: board
        // ,
        // obstacles: figs
    });

     draggie.on("dragStart",dragStart);
    // draggie.on("dragEnd",dragEnd);

    inputX = document.getElementById("x");
    inputY = document.getElementById("y");
}

function dragStart(e, t) {
    console.log(draggie.relativeStartPosition);
    // console.log('dragStart');
    // console.log(e);
}
function dragEnd(e, t) {
    console.log('dragEnd');
    console.log(e);
}
