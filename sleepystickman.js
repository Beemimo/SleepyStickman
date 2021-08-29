'// Try tapping the ball';

// This is the bottom of the screen
const screenBase = window.innerHeight;
const jumpHeight = 50;
const moveWidth = 20;
const mrSleepyRadius = 20;
const screenStartX = 20
const screenEndX = 207

console.log(window.innerWidth);
console.log(window.innerHeight);
// Welcome to the Grasshopper Gallery!
let y = 200;
let x = 120;
let mLeft = 0;
let mRight = 0;
let bedXStart = 5;//150
let bedXEnd = 250;//80
let bedYStart = 40;
let bedYEnd = 40;

let mrSleepy = svg.append('circle').attr('r', mrSleepyRadius).attr('cy', y).attr('cx', x).attr('fill', 'black');
let bed = svg.append('line').attr('x1', bedXStart).attr('x2', bedXEnd).attr('y1', bedYStart).attr('y2', bedYEnd).attr('style', 'stroke:purple').attr('stroke-width', 2);
let bedBorder = bedYStart + mrSleepyRadius;



// Draw Mr.Sleepy
 //p.s The coordinates follow X, Y
let stickMan = "M 110 300, L 120 300, 120 310, 110 310, M 115 310, L 115 313, 114 313, 114 310 M 115 313, L 130 318, 130 319, 115, 314, M 115, 311, L 108 311, 108 303, 109 303, 109 309Z";
mrSleepy.append('path')
  .attr('d', stickMan)
  .attr('fill', 'black');

let manStick = svg.append('path')
  .attr('d', stickMan)
  .attr('fill', 'black');
//manStick.transition().duration(3000).attr('transform','translate(0,0)');




let slab_half_width = 25; // Slab width is 50, but we draw the line from x-slab_half_width to x+slab_half_width

let arr = [20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170,  180, 190, 200];
let slabX = [60, 120, 180];
let slabY = [240, 280, 320];

const numberOfSlabs = slabX.length;
let slabs = [];

//let slabsYStart = [];
//let slabsYEnd = [];
let slabsBorder = [];
let slabsXStart = [];
let slabsXEnd = [];

for (let i = 0; i < numberOfSlabs; i++){
    slabs[i] = svg.append('line').attr('y1', slabY[i]).attr('y2', slabY[i]).attr('x1', slabX[i]-slab_half_width).attr('x2', slabX[i]+slab_half_width).attr('style', 'stroke:green');
    slabsBorder[i] = slabY[i] - mrSleepyRadius;
    slabsXStart[i] = slabX[i] - slab_half_width; 
    slabsXEnd[i] = slabX[i] + slab_half_width;
    console.log(slabsBorder[i]);
}

mrSleepy.slabsBorder = slabsBorder;

//mrSleepy.on('click', jump);
//mrSleepy.on('keypress', move);
d3.select("body").on("keydown", move);


function checkSlabTouched2 () {
    let i=0;
    while (i < numberOfSlabs){
        console.log("Test");
        i=i+1;
    }
}

function drawWin(){
    // Clear screen
    svg.select('circle').remove();
    svg.selectAll('line').remove();
    
    // Draw You've Won
    let path = "M 10 10, L 20 10, 40 50, 60 10, 70 10, 30 100, 50 100, M 90 50, L 130 50, 130 100, 90 100, M 150 50, L 160 50, 160 90, 190 90, 190 50, 200 50, 200 100, 150 100 M 10 150, L 20 150, 20 250, 35 210, 45 210, 60 250, 60 150, 70 150, 70 250, 60 250, 40 220, 20 250, 10 250, M 90 200, L 130 200, 130 250, 90 250, M 150 250, L 150 200, 200 200, 200 250, 190 250, 190 210, 160 210, 160 250, 150 250Z";
    let peaceSign = svg.append('path')
      .attr('d', path)
      .attr('fill', 'black');
}

function jump() {
    // Get the current height and jump from here
    if (d3.event.keyCode === 38){
        y = mrSleepy.attr('cy') - jumpHeight;
        if (y < 0) {
            y = 0;
        } else if (y > screenBase) {
            y = screenBase;
        }
    
        mrSleepy.interrupt().attr('cy', y);
        mrSleepy.transition().attr('cy', screenBase).ease(d3.easeQuadIn).duration(5000);
        
        manStick.interrupt()
        let str_translate = "translate(0, " + (y-300) + ")";

        manStick.transition().duration(0).attr('transform',str_translate);
        str_translate = "translate(0, " + (screenBase-300) + ")";
        manStick.transition().ease(d3.easeQuadIn).duration(5000).attr('transform',str_translate);
    }
    
}


    
var timer = d3.timer(function () {    
    //REACT TO BED
    if (mrSleepy.attr('cy') < bedBorder && mrSleepy.attr('cx') > bedXStart && mrSleepy.attr('cx') < bedXEnd) {
        mrSleepy.interrupt().attr('cy', bedBorder);
        timer.stop();
        //drawWin();
        setTimeout(drawWin, 1000);
    }
    //REACT TO SLABS
    for (let i = 0; i < numberOfSlabs; i++)
            if (mrSleepy.attr('cy') > slabsBorder[i] &&
                mrSleepy.attr('cy') < slabsBorder[i] + 5 &&
                mrSleepy.attr('cx') > slabsXStart[i] &&
                mrSleepy.attr('cx') < slabsXEnd[i]) {
                
                mrSleepy.interrupt().attr('cy', slabsBorder[i]);
                mrSleepy.transition().attr('cy', screenBase).ease(d3.easeQuadIn).duration(5000);
            } /*else {
                mrSleepy.transition().attr('cy', screenBase).ease(d3.easeQuadIn).duration(5000);
            }*/

}, 500);



function moveRight() {
    if (d3.event.keyCode === 39){
        mRight = Number(mrSleepy.attr('cx')) + moveWidth;
        if (mRight > screenEndX) {
            mRight = screenEndX;
        }
        mrSleepy.attr('cx', mRight);
    }
}

function moveLeft() {
    if (d3.event.keyCode === 37){        
        mLeft = Number(mrSleepy.attr('cx')) - moveWidth;
        if (mLeft < screenStartX) {
            mLeft = screenStartX;
        }
        mrSleepy.attr('cx', mLeft);
    }
}

function move() {
    
    //jump
    if (d3.event.keyCode === 38){
        jump(); 
    }
    
    //move Left
    else if (d3.event.keyCode === 37){
        moveLeft();
    }
    
    //move Right
    else if (d3.event.keyCode === 39){
        moveRight();
    }

}


//d3.select(mrSleepy)
