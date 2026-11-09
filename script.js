let spreadSlider;
let sizeSlider;
let sizespSlider;
let baseHueSlider;
let huespSlider;
let alphaSlider;
let walker;
let land;
let theta = 0.0;
let randomCounts = [];
let t = 0.0;
let events=[1];
let yofset=5;
let seed=5;
let gentree;
let debug = true;
let flowfield;
let vehicles=[];
let flowFieldInitialized = false;
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
const button_tree=document.getElementById("tree");
button_tree.addEventListener('click',settree);
function settree(){
    for(let i=0;i<20;i++){
         if(events[i]===1 && i!=10){
            events[i]=0;
         }
    }newtreeButton=createButton('new tree');
    newtreeButton.position(20,220);
    newtreeButton.mousePressed(newtree);
    clearButtonClicked();
    events[10]=1;
    slider();
}
/*const button_wind=document.getElementById("wind");
button_wind.addEventListener('click',setwind);
function setwind(){
    for(let i=0;i<20;i++){
        if(events[i]===0 && i!=11){
            events[i]=0;
        }
    }
    clearButtonClicked();
    events[11]=1;
    slider();}*/
function slider(){
if (events[4]===1){
    if (!spreadSlider){createControls(300);}
    Title.show();clearButton.show();spreadTitle.show();spreadSlider.show();sizeTitle.show();sizeSlider.show();sizespTitle.show();sizespSlider.show();baseHueTitle.show();baseHueSlider.show();huespTitle.show();huespSlider.show();alphaTitle.show();alphaSlider.show();}
    else{if (spreadSlider){Title.hide();clearButton.hide();spreadTitle.hide();spreadSlider.hide();sizeTitle.hide();sizeSlider.hide();sizespTitle.hide();sizespSlider.hide();baseHueTitle.hide();baseHueSlider.hide();huespTitle.hide();huespSlider.hide();alphaTitle.hide();alphaSlider.hide();}}
if (events[10]===1){if(!newtreeButton)newtreeButton.show();}
else {if(newtreeButton)newtreeButton.hide();}}

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
fill(0,0,0,0.1);
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
else if(events[10]===1){
    background(97);
    translate(width/2,height);
    yofset+=0.005;
    randomSeed(seed);
    branch(60,0);
    gentree=false;
}
else if(events[11]===1){
    if(!flowFieldInitialized){
    flowfield = new FlowField(20);
    for(let i=0; i<120;i++){
      vehicles.push(new vehicle(random(width),random(height),random(2,5),random(0.1,0.5)));
    }
flowFieldInitialized=true;}
    if (debug) flowfield.display();
    for(let i=0;i<vehicles.length;i++){
        vehicles[i].follow(flowfield);
        vehicles[i].run();
    }
}
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
function newtree(){
yofset=random(1000);
speed=millis();
}
function createControls(ypos){
    let xpos = 0;
    Title=createP("Paint Splatter Simulation");
    Title.position(xpos, ypos - 90);
    Title.style("font-size","14pt");
    Title.style("font-weight","bold");
    xpos += 220;

    clearButton = createButton("clear");
    clearButton.position(xpos,ypos - 70);
    clearButton.mousePressed(clearButtonClicked);

    xpos = 0;
    spreadTitle = createP("Spread");
    spreadTitle.position(xpos,ypos-45);
    xpos += 50;

    spreadSlider = createSlider(0, 0.75, 0.25, 0);
    spreadSlider.position(xpos, ypos- 30);
    spreadSlider.size(80);
    xpos += 100;

    sizeTitle = createP("size");
    sizeTitle.position(xpos, ypos-45);
    xpos += 35;

    sizeSlider = createSlider(5, 50, 20, 0);
    sizeSlider.position(xpos, ypos - 30);
    sizeSlider.size(80);
    xpos += 100;

    sizespTitle = createP("Size Spread");
    sizespTitle.position(xpos, ypos-45);
    xpos += 80;

    sizespSlider = createSlider(0,0.1,0.01,0);
    sizespSlider.position(xpos, ypos -30);
    sizespSlider.size(80);
    xpos += 100;

    xpos = 0;
    baseHueTitle = createP("Base Hue");
    baseHueTitle.position(xpos, ypos - 15);
    xpos += 70;

    baseHueSlider = createSlider(0, 360, 250, 0);
    baseHueSlider.position(xpos,ypos );
    baseHueSlider.size(80);
    xpos += 100;

    huespTitle = createP("Hue Spread");
    huespTitle.position(xpos,ypos - 15);
    xpos+=80;

    huespSlider = createSlider(0,100,15,0);
    huespSlider.position(xpos, ypos );
    huespSlider.size(80);
    xpos += 100;

    alphaTitle = createP("Transparency");
    alphaTitle.position(xpos,ypos - 15);
    xpos += 90;

    alphaSlider = createSlider(0, 1, 0.75, 0);
    alphaSlider.position(xpos,ypos );
    alphaSlider.size(80);
    xpos += 100;
}

function clearButtonClicked(){
    background(97);
}
function branch(h,xoff){
let sw = map(h,2,100,1,5 );
strokeWeight(sw);
line(0,0,0,-h);
translate(0,-h);
h*=0.7;
xoff +=0.1;
if(h>4){
    let n =floor(random(1,5));
    for(let i = 0; i<n;i++)
    {let theta=(noise(xoff+i,yofset)-0.5)*PI;
        if (n%2 == 0) theta*= -1;
        push();
        rotate(theta);
        branch(h, xoff);
        pop(); 
    }
}
}
function make2DArray(cols,rows){
    let array = new Array(cols);
    for(let i =0;i<array.length;i++){
        array[i] = new Array(rows);
    }
    return array;
}
class FlowField{
    constructor(r){
        this.resolution = r;
        this.cols = width / this.resolution;
        this.rows = height / this.resolution;
        this.field =make2DArray(this.cols,this.rows);
        this.init();
    }
init(){
    noiseSeed(random(10000));
    let xoff =0;
    for(let i=0;i< this.cols;i++){
        let yoff =0;
        for(let j =0;j<this.rows;j++){
            let angle =map(noise(xoff,yoff),0,1,0,TWO_PI);
            this.field[i][j]=p5.Vector.fromAngle(angle);
            yoff += 0.1;
        }
        xoff += 0.1;
    }
}
display(){
    for(let i =0;i< this.cols; i++){
        for(let j =0;j< this.rows; j++){
            drawVector(this.field[i][j], i* this.resolution,j*this.resolution,
                this.resolution-2);
        }
    }
}
lookup(lookup){
    let column = constrain(floor(lookup.x / this.resolution),0,this.cols-1);
    let row = constrain(floor(lookup.y / this.resolution), 0,this.rows -1);
    return this.field[column][row].copy();
}
}
function drawVector(v,x,y,scayl){
    push();
    let arrowsize = 4;
    translate(x,y);
    strokeWeight(1);
    stroke(127);
    rotate(v.heading());
    let len = v.mag()*scayl;
    line(0,0,len,0);
    line(len,0,len-arrowsize,+arrowsize/2);
    pop();
}
class vehicle{
    constructor(x,y,ms,mf){
        this.position = createVector(x,y);
        this.acceleration = createVector(0,0);
        this.velocity = createVector(0,0);
        this.r =4;
        this.maxspeed =ms || 4;
        this.maxforce =mf || 0.1;
    }
run(){
    this.update();
    this.borders();
    this.display();
}
follow(flow){
    let desired =flow.lookup(this.position);
    desired.mult(this.maxspeed);
    let steer =p5.Vector.sub(desired,this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
}
applyForce(force){
    this.acceleration.add(force);
}
update(){
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
}
borders(){
    if (this.position.x<-this.r) this.position.x=width+this.r;
    if(this.position.y<-this.r) this.position.y=height +this.r;
    if(this.position.x> width +this.r) this.position.x =-this.r;
    if(this.position.y>height+this.r) this.position.y = - this.r;
}
display(){
    let t = this.velocity.heading()+PI/2;
    fill(127);
    stroke(0);
    strokeWeight(2);
    push();
    translate(this.position.x,this.position.y);
    rotate(t);
    beginShape();
    vertex(0, -this.r*2);
    vertex(-this.r,this.r*2);
    vertex(this.r, this.r*2);
    endShape(CLOSE);
    pop();
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