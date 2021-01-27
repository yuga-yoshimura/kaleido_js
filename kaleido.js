var NUM = 100;
var CIRC_DIV = 7;

var cnt = 0;
var x = new Array(NUM);
var y = new Array(NUM);

var colorFrom, colorTo

var vx = 3, vy = 3;
var ax = 1, ay = 1;

function setup() {
    myCanvas = createCanvas(windowWidth,windowHeight);
    myCanvas.parent("myContainer");
    smooth(2);

    colorFrom = color(255,128,128);
    colorTo   = color(100,100,255);
}

function draw() {
    background(0);
    shiftPositionArray();
    storeRandomPosition();
    //storeMousePosition();
    drawLines();
}

function shiftPositionArray() {
    for(var i = cnt-1 ; 0 < i ; i-- ) {
        x[i] = x[i-1];
        y[i] = y[i-1];
    }
}

function storeRandomPosition() {
    if( 1 < cnt ) {
        x[0] = constrain(x[1] + vx, 50, width-50);
        y[0] = constrain(y[1] + vy, 50, height-50);
    } else {
        x[0] = width/2;
        y[0] = height/2;
    }
    vx = constrain(vx + ax, -10, 10);
    vy = constrain(vy + ay, -10, 10);
    ax = constrain(ax + random(-3, 3), -5, 5);
    ay = constrain(ay + random(-3, 3), -5, 5);
    if( cnt < NUM ) cnt++;
}

function storeMousePosition() {
    x[0] = mouseX;
    y[0] = mouseY;
    if( cnt < NUM ) cnt++;
}

function drawLines() {
    push();
    translate(width/2, height/2);
    for( var a = 0 ; a < CIRC_DIV ; a++ ) {
        for( var i = cnt-1 ; 0 < i ; i-- ) {
            var m = map(i, 0, cnt - 1, 255, 10);
            var c = lerpColor(colorFrom, colorTo, i/(cnt-1));
            c.setAlpha(m);
            stroke(c);
            strokeWeight(3);
            line(x[i-1] - width/2, y[i-1] - height/2, x[i] - width/2, y[i] - height/2);
            line(width/2 - x[i-1], y[i-1] - height/2, width/2 - x[i], y[i] - height/2);
        }
        rotate((2 * PI)/CIRC_DIV);
    }
    pop();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
