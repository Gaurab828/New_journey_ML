let spreadSlider;
let sizeSlider;
let sizespSlider;
let baseHueSlider;
let huespSlider;
let alphaSlider;
let walker;
let randomCounts = [];
let t = 0.0;
let events=[1];
const button_walker=document.getElementById("random_walker");
button_walker.addEventListener('click',set_rwalker);
function set_rwalker(){
    for (let i=0;i<20;i++){
        if (events[i]===1 && i!=0){
            events[i]=0;
        }
    }
    clearButtonClicked();
    events[0]=1;
    slider();
}
const button_follower=document.getElementById("mouse_follow");
button_follower.addEventListener('click',set_follower);
function set_follower(){
    for (let i=0;i<20;i++){
        if (events[i]===1 && i!=1){
            events[i]=0;
        }
    }
    clearButtonClicked();
    events[1]=1;
    slider();
}
const button_gausdis=document.getElementById("gaussian_dis");
button_gausdis.addEventListener('click',setgausdis);

function setgausdis(){
    for(let i=0;i<20;i++){
        if (events[i]===1 && i!=2){
            events[i]=0;
        }
    }
    clearButtonClicked();
    events[2]=1;
    slider();
}
const button_gauswalker=document.getElementById("gaussian_walker");
button_gauswalker.addEventListener('click',setgauswalker);

function setgauswalker(){
    for(let i=0;i<20;i++){
        if (events[i]===1 && i!=3){
            events[i]=0;
        }
    }
    clearButtonClicked();
    events[3]=1;
    slider();
}
const button_dots=document.getElementById("gaussian_dots");
button_dots.addEventListener('click',setdots);
function setdots(){
    for(let i=0;i<20;i++){
        if (events[i]===1 && i!=4){
            events[i]=0;
        }
    }
    clearButtonClicked();
    events[4]=1;
    slider();
}
const button_noisegraph=document.getElementById("noise");
button_noisegraph.addEventListener('click',setnoisegraph);
function setnoisegraph(){
    for(let i=0;i<20;i++){
        if (events[i]===1 && i!=5){
            events[i]=0;
        }
    }
    clearButtonClicked();
    events[5]=1;
    slider();
}
const button_noisewalker=document.getElementById("noise_walker");
button_noisewalker.addEventListener('click',setnoisewalker);
function setnoisewalker(){
    for(let i=0;i<20;i++){
        if (events[i]===1 && i!=6){
            events[i]=0;
        }
    }
    clearButtonClicked();
    events[6]=1;
    slider();
}
const button_scarce=document.getElementById("scarce_random");
button_scarce.addEventListener('click',setscarce);
function setscarce(){
    for(let i=0;i<20;i++){
        if(events[i]===1 && i!=7){
            events[i]=0;
        }
    }
    clearButtonClicked();
    events[7]=1;
    slider();
}
const button_marble=document.getElementById("marble");
button_marble.addEventListener('click',setmarble);
function setmarble(){
    for(let i=0;i<20;i++){
        if (events[i]===1 && i!=8){
            events[i]=0;
        }
    }
    clearButtonClicked();
    generatemarble=true;
    events[8]=1;
    slider();
}
const button_terrain=document.getElementById("terrain");
button_terrain.addEventListener('click',setterrain);
function setterrain(){
    for(let i=0;i<20;i++){
        if (events[i]===1 && i!=9){
            events[i]=0;
        }
    }
    clearButtonClicked();
    events[9]=1;
    slider();
    generateterrain=true;
}
function slider(){
if (events[4]===1){
    if (!spreadSlider){createControls(300);}
    Title.show();clearButton.show();spreadTitle.show();spreadSlider.show();sizeTitle.show();sizeSlider.show();sizespTitle.show();sizespSlider.show();baseHueTitle.show();baseHueSlider.show();huespTitle.show();huespSlider.show();alphaTitle.show();alphaSlider.show();}
    else{if (spreadSlider){Title.hide();clearButton.hide();spreadTitle.hide();spreadSlider.hide();sizeTitle.hide();sizeSlider.hide();sizespTitle.hide();sizespSlider.hide();baseHueTitle.hide();baseHueSlider.hide();huespTitle.hide();huespSlider.hide();alphaTitle.hide();alphaSlider.hide();}}}

function setup(){
    let canvas=createCanvas(640,250);
    canvas.parent("canvas_holder");
    walker=new walk();
    colorMode(HSB);
    background(97);
    for (let i =0; i<15; i++){
      randomCounts[i] = 0;}
    }
function draw(){
    if (events[0]===1){
    walker.step();
    walker.show();}
    else if (events[5]===1){
    background(97);
    let xoff =t;
    noFill();
    stroke(0);
    strokeWeight(2);
    beginShape();
    for (let i = 0;i<width;i++){
        let y = noise(xoff) * height;
        xoff += 0.01;
        vertex(i,y);
    }
    endShape();
    t += 0.01;}

    else if (events[7]===1)
    {let index = int(acceptreject()*randomCounts.length);
    randomCounts[index]++;

    stroke(0);
    strokeWeight(2);
    fill(190);

    let w = width /randomCounts.length;
    for(let x = 0;x<randomCounts.length;x++){
        rect(x * w,height - randomCounts[x],w -1,randomCounts[x]);
    }
}
//Lévy flight is a procedure where random big jumps are introduced to reduce oversampling or overlaping
else if (events[1]===1){
    walker.follow();//for mouse follow
    walker.show();}
else if (events[6]===1){
    walker.step_2();
    walker.show();
}
else if (events[2]===1){
let x = randomGaussian(320,80);//320 is average and 60 is deviation.//for gaussian random circles.
noStroke();
fill(0,10);
circle(x,120,18);}
else if (events[3]===1){
    walker.step_1();
    walker.show();
}else if(events[8]===1){
    if (generatemarble){
    loadPixels();

    let xoff=0.0;
    for(let x=0;x<width;x++){
    let yoff=0.0;
    for(let y=0;y<height;y++){
    let bright=map(noise(xoff,yoff),0,1,0,255);
    set(x,y,floor(bright));
    yoff+=0.01;
    }
    xoff +=0.1;
    }
updatePixels();
generatemarble=false;
}}
else if(events[4]===1)
{translate(width/2,height/2);
scale(height/2);
let x = randomGaussian(0, spreadSlider.value());
let y = randomGaussian(0,spreadSlider.value());
let size = randomGaussian(sizeSlider.value()/height,sizespSlider.value());
if (size <=0){
    size =0.01;
}
let paintHue = randomGaussian(baseHueSlider.value(),huespSlider.value());
let paintSat = randomGaussian(80,20);
let paintBright = randomGaussian(80,20);
if (paintHue <0){
    paintHue += 360;
} else if (paintHue >= 360){
    paintHue -=360;
}
if (paintSat > 100){
    paintSat = 100;
}
if (paintBright > 100){
    paintBright =100;
}
noStroke();
fill(paintHue,paintSat,paintBright,alphaSlider.value());
ellipse(x,y,size,size);
}}
function acceptreject(){
    while(true){
        let r1=random(1);
        let probability = r1;
        let r2 = random(1);
        if (r2>probability){
            return r1;
        }
}}
function createControls(ypos){
    let xpos = 0;
    Title=createP("Paint Splatter Simulation");
    Title.position(xpos, ypos - 50);
    Title.style("font-size","14pt");
    Title.style("font-weight","bold");
    xpos += 220;

    clearButton = createButton("clear");
    clearButton.position(xpos,ypos - 30);
    clearButton.mousePressed(clearButtonClicked);

    xpos = 0;
    spreadTitle = createP("Spread");
    spreadTitle.position(xpos,ypos);
    xpos += 50;

    spreadSlider = createSlider(0, 0.75, 0.25, 0);
    spreadSlider.position(xpos, ypos+ 15);
    spreadSlider.size(80);
    xpos += 100;

    sizeTitle = createP("size");
    sizeTitle.position(xpos, ypos);
    xpos += 35;

    sizeSlider = createSlider(5, 50, 20, 0);
    sizeSlider.position(xpos, ypos + 15);
    sizeSlider.size(80);
    xpos += 100;

    sizespTitle = createP("Size Spread");
    sizespTitle.position(xpos, ypos);
    xpos += 80;

    sizespSlider = createSlider(0,0.1,0.01,0);
    sizespSlider.position(xpos, ypos + 15);
    sizespSlider.size(80);
    xpos += 100;

    xpos = 0;
    baseHueTitle = createP("Base Hue");
    baseHueTitle.position(xpos, ypos + 15);
    xpos += 70;

    baseHueSlider = createSlider(0, 360, 250, 0);
    baseHueSlider.position(xpos,ypos + 30);
    baseHueSlider.size(80);
    xpos += 100;

    huespTitle = createP("Hue Spread");
    huespTitle.position(xpos,ypos + 15);
    xpos+=80;

    huespSlider = createSlider(0,100,15,0);
    huespSlider.position(xpos, ypos + 30);
    huespSlider.size(80);
    xpos += 100;

    alphaTitle = createP("Transparency");
    alphaTitle.position(xpos,ypos + 15);
    xpos += 90;

    alphaSlider = createSlider(0, 1, 0.75, 0);
    alphaSlider.position(xpos,ypos + 30);
    alphaSlider.size(80);
    xpos += 100;
}

function clearButtonClicked(){
    background(97);
function make2DArray(cols,rows){
    let arr = new Array(cols);
    for(let i =0;i<arr.length;i++){
        arr[i] = new Array(rows);
    }
    return arr;
}
class terrain{
    constructor(scl,w,h){
        this.scl =scl;
        
    }
}
}
class walk{
    constructor(){
        this.x=width/2;
        this.y=height/2;
        this.tx =0;
        this.ty=10000;

}
show(){
    stroke(0);
    point(this.x,this.y);
}
step(){
    let choicex= floor(random(3))-1;
    let choicey= floor(random(3))-1;
    this.x+=choicex;
    this.y+=choicey;}

step_2(){this.x = map(noise(this.tx),0,1,0,width);
    this.y =map(noise(this.ty),0,1,0,height);
    this.tx += 0.01;
    this.ty +=0.01;}

step_1(){
let choicex=randomGaussian(0,3);
let choicey=randomGaussian(0,3);
this.x+=choicex;
this.y+=choicey;
}
follow(){
    let a=mouseX-this.x;
    let b=mouseY-this.y;
    let ran=floor(random(100));
    let c,d;
    if (ran<44){
    if (a>0){
        c=1;
    }else if (a<0){
        c=-1;
    }else{c=0;}
    if (b>0){
        d=1;
    }else if (b<0){
        d=-1;
    }else{d=0;}
    this.x+=c;
    this.y+=d;
    }else
        {this.step();}}}