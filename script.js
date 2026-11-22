let spreadSlider;let sizeSlider;let sizespSlider;let baseHueSlider;let huespSlider;let alphaSlider;let walker;let land;let theta = 0.0;let randomCounts = [];let t = 0.0;let events=[1];let yofset=5;let seed=5;let gentree;


//Lévy flight is a procedure where random big jumps are introduced to reduce oversampling or overlaping
    let a;let tx=0;let ty=1000;
    let revents=[];
    const rmode={
        random_walker:1,
        mouse_follow:2,
        gaussian_dis:3,
        gaussian_walker:4,
        gaussian_dots:5,
        scarce_random:6,
        noise_walker:7,
        noise:8,
        marble:9,
        tree:10
    };
    for (const [id,index] of Object.entries(rmode)){
        document.getElementById(id).addEventListener('click',() => setrmode(index));
    }
    function setrmode(index){
        revents.fill(0);
        revents[index]=1;
        if (lrandom){ lrandom.background(97);
            lrandom.updateControls();
        }
        if(index===1 || index===2 || index ===4) {x=320; y=125;}
        if(index===6) a=0;
        if(index===9) generatemarble=true;
        if(index===10) gentree=true;
    }
    const random = (r) =>{
    if(revents[4]===1) slider();
    r.setup = () =>{
    r.createCanvas(640,250);
    r.colorMode(r.HSB);
    r.background(97);
    for (let i =0; i<15; i++){
        randomCounts[i] = 0;}
    createControls(r,400);
    r.updateControls();
    };
    r.updateControls = () =>{
    if(revents[5]===1){
    Title.show();clearButton.show();spreadTitle.show();spreadSlider.show();sizeTitle.show();sizeSlider.show();sizespTitle.show();sizespSlider.show();baseHueTitle.show();baseHueSlider.show();huespTitle.show();huespSlider.show();alphaTitle.show();alphaSlider.show();}
    else{Title.hide();clearButton.hide();spreadTitle.hide();spreadSlider.hide();sizeTitle.hide();sizeSlider.hide();sizespTitle.hide();sizespSlider.hide();baseHueTitle.hide();baseHueSlider.hide();huespTitle.hide();huespSlider.hide();alphaTitle.hide();alphaSlider.hide();}
    
    if(revents[10]===1){
        newtreebutton.show();
    }else{newtreebutton.hide();}};

    r.draw = () =>{
        if (revents[1]===1){
            let x1=x;
            let y1=y;
            let choicex= r.floor(r.random(7))-3;
            let choicey= r.floor(r.random(7))-3;
            x+=choicex;
            y+=choicey;
            r.stroke(0);
            r.line(x1,y1,x,y);
        }
        if (revents[2]===1){
        let a=r.mouseX-x;
        let b=r.mouseY-y;
        let x1=x;
        let y1=y;
        let ran=r.floor(r.random(100));
        let c,d;
        if (ran<44){
        if (a>0){
        c=3;
        }else if (a<0){
        c=-3;
        }else{c=0;}
        if (b>0){
        d=3;
        }else if (b<0){
        d=-3;
        }else{d=0;}
        x+=c;
        y+=d;
        }else
        {let choicex= r.floor(r.random(9))-4;
        let choicey= r.floor(r.random(9))-4;
            x+=choicex;
            y+=choicey;
            }
        r.stroke(0);
        r.line(x1,y1,x,y);
        }
        if(revents[3]===1){
            let x = r.randomGaussian(320,80);//320 is average and 60 is deviation.//for gaussian random circles.
            r.noStroke();
            r.fill(0,0,0,0.1);
            r.circle(x,120,18);
        }
        if(revents[4]===1){
            let x1=x;
            let y1=y;
            let choicex=r.randomGaussian(0,4);
            let choicey=r.randomGaussian(0,4);
            x+=choicex;
            y+=choicey;
            r.stroke(0);
            r.line(x1,y1,x,y);
        }
        if(revents[5]===1){
            r.translate(r.width/2,r.height/2);
            r.scale(r.height/2);
            let x = r.randomGaussian(0, spreadSlider.value());
            let y = r.randomGaussian(0,spreadSlider.value());
            let size = r.randomGaussian(sizeSlider.value()/r.height,sizespSlider.value());
            if (size <=0){
                size =0.01;
            }
            let paintHue = r.randomGaussian(baseHueSlider.value(),huespSlider.value());
            let paintSat = r.randomGaussian(80,20);
            let paintBright = r.randomGaussian(80,20);
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
            r.noStroke();
            r.fill(paintHue,paintSat,paintBright,alphaSlider.value());
            r.ellipse(x,y,size,size);
            }
        
        if(revents[6]===1){
            let r1=r.random(1);
            let probability = r1;
            let r2 = r.random(1);
            if (r2>probability){
                a=r1;
            }           
            let index = r.int(a*randomCounts.length);
            randomCounts[index]++;
            r.stroke(0);
            r.strokeWeight(2);
            r.fill(190);
            let w = r.width /randomCounts.length;
            for(let x = 0;x<randomCounts.length;x++){
            r.rect(x * w,r.height - randomCounts[x],w -1,randomCounts[x]);
        }
    }
    if (revents[7]===1){
        let x =r.map(r.noise(tx),0,1,0,640);
        let y =r.map(r.noise(ty),0,1,0,250);
        tx += 0.01;
        ty += 0.01;
        r.stroke(0);
        r.point(x,y);
    }
    if (revents[8]===1){
        r.background(97);
        let xoff =t;
        r.noFill();
        r.stroke(0);
        r.strokeWeight(2);
        r.beginShape();
        for (let i = 0;i<r.width;i++){
        let y = r.noise(xoff) * r.height;
        xoff += 0.01;
        r.vertex(i,y);
    }
        r.endShape();
    t += 0.01;
    }
    if (revents[9]===1){
         if (generatemarble){
            r.loadPixels();
            let xoff=0.0;
            for(let x=0;x<r.width;x++){
            let yoff=0.0;
            for(let y=0;y<r.height;y++){
            let bright=r.map(r.noise(xoff,yoff),0,1,0,100);
            r.set(x,y,r.floor(bright));
            yoff+=0.01;
            }
            xoff +=0.1;
            }
        r.updatePixels();
        generatemarble=false;
        }
    }
    if (revents[10]===1){
        r.background(97);
        r.translate(r.width/2,r.height);
        yofset+=0.005;
        r.randomSeed(seed);
        branch(r,60,0);
    }
};
function createControls(r,ypos){
    let xpos = 0;
    Title=r.createP("Paint Splatter Simulation");
    Title.position(xpos, ypos - 90);
    Title.style("font-size","14pt");
    Title.style("font-weight","bold");
    xpos += 220;

    clearButton =r.createButton("clear");
    clearButton.position(xpos,ypos - 70);
    clearButton.mousePressed(() => r.background(97));

    newtreebutton = r.createButton("new tree");
    newtreebutton.position(xpos-45,ypos-70);
    newtreebutton.mousePressed(()=> newtree(r));

    xpos = 0;
    spreadTitle =r.createP("Spread");
    spreadTitle.position(xpos,ypos-45);
    xpos += 50;

    spreadSlider =r.createSlider(0, 0.75, 0.25, 0);
    spreadSlider.position(xpos+15, ypos- 30);
    spreadSlider.size(80);
    xpos += 100;

    sizeTitle =r.createP("size");
    sizeTitle.position(xpos, ypos-45);
    xpos += 35;

    sizeSlider =r.createSlider(5, 50, 20, 0);
    sizeSlider.position(xpos+15, ypos - 30);
    sizeSlider.size(80);
    xpos += 100;

    sizespTitle =r.createP("Size Spread");
    sizespTitle.position(xpos, ypos-45);
    xpos += 80;

    sizespSlider =r.createSlider(0,0.1,0.01,0);
    sizespSlider.position(xpos+15, ypos -30);
    sizespSlider.size(80);
    xpos += 100;

    xpos = 0;
    baseHueTitle =r.createP("Base Hue");
    baseHueTitle.position(xpos, ypos - 15);
    xpos += 70;

    baseHueSlider =r.createSlider(0, 360, 250, 0);
    baseHueSlider.position(xpos+15,ypos );
    baseHueSlider.size(80);
    xpos += 100;

    huespTitle =r.createP("Hue Spread");
    huespTitle.position(xpos,ypos - 15);
    xpos+=80;

    huespSlider =r.createSlider(0,100,15,0);
    huespSlider.position(xpos+15, ypos );
    huespSlider.size(80);
    xpos += 100;

    alphaTitle =r.createP("Transparency");
    alphaTitle.position(xpos,ypos - 15);
    xpos += 90;

    alphaSlider =r.createSlider(0, 1, 0.75, 0);
    alphaSlider.position(xpos+15,ypos );
    alphaSlider.size(80);
    xpos += 100;
}
    function branch(r,h,xoff){
    let sw = r.map(h,2,100,1,5 );
    r.strokeWeight(sw);
    r.line(0,0,0,-h);
    r.translate(0,-h);
    h*=0.7;
    xoff +=0.1;
    if(h>4){
    let n =r.floor(r.random(1,5));
    for(let i = 0; i<n;i++)
    {let theta=(r.noise(xoff+i,yofset)-0.5)*r.PI;
        if (n%2 == 0) theta*= -1;
        r.push();
        r.rotate(theta);
        branch(r, h, xoff);
        r.pop(); 
    }
}
}
function newtree(){
yofset=r.random(1000);
seed=r.millis();
}
    };


    let vevents=[];
    const vmode={
        ball:1,
        vectorsub:2,
        func:3,
        acceleration:4,
        ran_acc:5,
        acc_tomouse:6,
        fast_follow:7,
        wind:8
    };
    let timex,timey;let position;let velocity;let acceleration;let debug = true;let flowfield;let vehicles = [];
    function setvMode(index){
        vevents.fill(0);
        vevents[index] = 1;
        if (lvector) lvector.background(255);
        if(index===1){
            position.set(100,100);
            velocity.set(3,2);
        }
        if(index===4 || index === 6 || index === 7){
            acceleration.set(-0.01,0.01);
            position.set(100,100);
            velocity.set(0,0);
        }
        if(index===5){
            position.set(320,125);
            velocity.set(0,0);
            timex=0;
            timey=1000;
        }
        if(index===8){
            flowfield.init();
        }
    }
    for (const [id,index] of Object.entries(vmode)){
        document.getElementById(id).addEventListener('click',() => setvMode(index));
    }
    const vector = (p) => {
        p.setup = () => {
            p.createCanvas(640,250);
            p.background(255);
            position=p.createVector(100,100); 
            velocity=p.createVector(0,0);
            acceleration=p.createVector(0,0);
            flowfield = new FlowField(p,20);
            for (let i = 0; i < 120; i++){
                vehicles.push(
                    new Vehicle(
                        p, p.random(p.width),p.random(p.height),p.random(2,5),p.random(0.1,0.5)
                    )
                );
            }          
        };
    p.draw =() => {
        if (vevents[1]===1){
        p.background(255);
        position.add(velocity);
        if(position.x>p.width-25 || position.x < 25){
            velocity.x = velocity.x * -1;
        }
        if (position.y>p.height-25 || position.y<25){
            velocity.y = velocity.y * -1;
        }
        p.stroke(0);
        p.fill(99);
        p.strokeWeight(2);
        p.circle(position.x,position.y,48);}

        if (vevents[2]===1){
            p.background(255);
            let mouse = p.createVector(p.mouseX, p.mouseY);
            let center = p.createVector(p.width/2, p.height/2);
            p.strokeWeight(4);
            p.stroke(200);
            p.line(0, 0, mouse.x, mouse.y);
            p.line(0,0,center.x, center.y);
            mouse.sub(center);
            p.stroke(0);
            p.translate(p.width/2,p.height/2);
            p.line(0,0,mouse.x,mouse.y);
        }
        if (vevents[3]===1){
            p.background(255);
            let mouse = p.createVector(p.mouseX, p.mouseY);
            let center = p.createVector(p.width/2, p.height/2);
            mouse.sub(center);
            const m= mouse.mag();
            p.fill(0);
            p.rect(10,10,m,10);
            p.translate(p.width/2,p.height/2);
            p.strokeWeight(2);
            p.stroke(200);
            p.line(0, 0, mouse.x,mouse.y);
            mouse.mult(0.5);
            p.stroke(97);
            p.strokeWeight(4);
            p.line(0,0,mouse.x,mouse.y);
            mouse.normalize();
            mouse.mult(15);
            p.stroke(0);
            p.strokeWeight(8);
            p.line(0,0,mouse.x,mouse.y);
        }
        if(vevents[4]===1){
        p.background(255);
        velocity.add(acceleration);
        position.add(velocity);
        velocity.limit(10);
        if(position.x>p.width-25 || position.x < 25){
            velocity.x = velocity.x * -1;
            acceleration.x = acceleration.x * -1;
        }
        if (position.y>p.height-25 || position.y<25){
            velocity.y = velocity.y * -1;
            acceleration.y = acceleration.y * -1;
        }
        p.stroke(0);
        p.fill(99);
        p.strokeWeight(2);
        p.circle(position.x,position.y,48);
        }
        if(vevents[5]===1){
            p.background(255);
            acceleration.set(p.map(p.noise(timex),0,1,-1,1),p.map(p.noise(timey),0,1,-1,1));
            timex+=0.01;
            timey+=0.01;
            acceleration.mult(p.random(0.98));
            velocity.add(acceleration);
            position.add(velocity);
            velocity.limit(5);
            if (position.x>p.width+25){
                position.x=-25;
            }else if(position.x<-25){
                position.x = p.width+25;
            }
            if (position.y>p.height+25){
                position.y =-25;
            }else if(position.y<-25){
                position.y = p.height+25; 
            }
            p.stroke(0);
            p.strokeWeight(2);
            p.fill(109);
            p.circle(position.x,position.y,48);
        }
        if(vevents[6]===1){
            p.background(255);
            let mouse = p.createVector(p.mouseX,p.mouseY);
            let acc=mouse;
            acc.sub(position);
            acc.normalize();
            acc.mult(0.2);
            velocity.add(acc);
            velocity.limit(5);
            position.add(velocity);
            p.stroke(0);
            p.strokeWeight(2);
            p.fill(127);
            p.circle(position.x, position.y, 48);
        }
        if(vevents[7]===1){
           p.background(255);
            let mouse = p.createVector(p.mouseX,p.mouseY);
            let acc=mouse;
            acc.sub(position);
            let magnitude = p.map(acc.mag(),0,p.max(p.width,p.height),0, 0.2);
            acc.normalize();
            acc.mult(magnitude);
            velocity.add(acc);
            velocity.limit(8);
            position.add(velocity);
            p.stroke(0);
            p.strokeWeight(2);
            p.fill(127);
            p.circle(position.x, position.y, 48); }
        if(vevents[8]===1){
            p.background(255);
            if(debug) flowfield.display();
            for (let i=0; i < vehicles.length;i++){
                vehicles[i].follow(flowfield);
                vehicles[i].run();
            }
        }
        
    };
class FlowField{
constructor(p, r){
        this.p = p;
        this.resolution = r;
        this.cols = this.p.floor(p.width / this.resolution);
        this.rows = this.p.floor(p.height / this.resolution);
        this.field =make2DArray(this.cols,this.rows);
        this.init();
    }
init(){
    this.p.noiseSeed(this.p.random(10000));
    let xoff =0;
    for(let i=0;i< this.cols;i++){
        let yoff =0;
        for(let j =0;j<this.rows;j++){
            let angle =this.p.map(this.p.noise(xoff,yoff),0,1,0,this.p.TWO_PI);
            this.field[i][j]=p5.Vector.fromAngle(angle);
            yoff += 0.1;
        }
        xoff += 0.1;
    }
}
display(){
    for(let i =0;i< this.cols; i++){
        for(let j =0;j< this.rows; j++){
            drawVector(this.p,this.field[i][j], i* this.resolution,j*this.resolution,
                this.resolution-2);
        }
    }
}
lookup(lookup){
    let column = this.p.constrain(this.p.floor(lookup.x / this.resolution),0,this.cols-1);
    let row = this.p.constrain(this.p.floor(lookup.y / this.resolution), 0,this.rows -1);
    return this.field[column][row].copy();
}
}
function drawVector(p,v,x,y,scayl){
    p.push();
    let arrowsize = 4;
    p.translate(x,y);
    p.strokeWeight(1);
    p.stroke(127);
    p.rotate(v.heading());
    let len = v.mag()*scayl;
    p.line(0,0,len,0);
    p.line(len,0,len-arrowsize,+arrowsize/2);
    p.pop();
}

class Vehicle{
constructor(p,x,y,ms,mf){
    this.p=p;
    this.position = this.p.createVector(x,y);
    this.acceleration = this.p.createVector(0,0);
    this.velocity = this.p.createVector(0,0);
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
    if (this.position.x<-this.r) this.position.x=p.width+this.r;
    if(this.position.y<-this.r) this.position.y=p.height +this.r;
    if(this.position.x>p.width +this.r) this.position.x =-this.r;
    if(this.position.y>p.height+this.r) this.position.y = - this.r;
}
display(){
    let t = this.velocity.heading()+this.p.PI/2;
    this.p.fill(127);
    this.p.stroke(0);
    this.p.strokeWeight(2);
    this.p.push();
    this.p.translate(this.position.x,this.position.y);
    this.p.rotate(t);
    this.p.beginShape();
    this.p.vertex(0, -this.r*2);
    this.p.vertex(-this.r,this.r*2);
    this.p.vertex(this.r, this.r*2);
    this.p.endShape(this.p.CLOSE);
    this.p.pop();} 
}
function make2DArray(cols,rows){
    let array = new Array(cols);
    for(let i =0;i<array.length;i++){
        array[i] = new Array(rows);
    }
    return array;
}
}; 
let zevents=[];
let zmode={
    terrain:1,
    idlegas:2
}
let boxsize;
let ball;
function setzmode(index){
    zevents.fill(0);
    zevents[index]=1;
}
for (const [id,index] of Object.entries(zmode)){
    document.getElementById(id).addEventListener('click',() =>setzmode(index));
}
const zaxis = (k) => {
    k.setup = () => {
        k.createCanvas(640,250,k.WEBGL);
        k.background(255);
        k.pixelDensity(1);
        land = new terrain(k, 20, 400, 400);
        land.calculate();
        boxsize= k.width/4;
        ball = new ball(k,boxsize);
    };
    k.draw = () => {
        if (zevents[1]===1){
        k.background(255);
        k.push();
        k.translate(0, 20, -200);
        k.rotateX(k.PI/3);
        k.rotateZ(theta);
        land.render();
        k.orbitControl();
        k.pop();
        theta += 0.0025;}
        else if(zevents[2]===1){
            k.background(255);
            k.orbitControl();
            k.noFill();
            k.rotateX(k.PI/3);
            k.rotateY(k.PI/1.5);
            k.box(boxsize);
            ball.update();
            ball.checkEdges();
            ball.show();
        }
        else{
            k.background(255);
        }
    };
    function make2DArray(cols,rows){
        let arr = new Array(cols);
        for(let i = 0; i<arr.length; i++){
            arr[i] = new Array(rows);
        }
        return arr;
    }
    class terrain{
        constructor(k, s, w, h){
            this.s=s;
            this.w=w;
            this.h=h;

            this.cols = k.floor(w/s);
            this.rows = k.floor(h/s);

            this.z = make2DArray(this.cols,this.rows);
            this.zoff = 0; 
        }
        calculate(){
            let xoff = 0;
            for (let i = 0;i<this.cols;i++){
                let yoff = 0;
                for(let j =0; j<this.rows; j++){
                    this.z[i][j]=k.map(k.noise(xoff, yoff, this.zoff), 0, 1, -120, 120);
                    yoff += 0.1;
                }
                xoff += 0.1;
            }
        }
        render() {
            k.noStroke();
            for(let x=0; x<this.z.length -1; x++){
                k.beginShape(k.QUAD_STRIP);
                for (let y=0; y<this.z[x].length;y++){
                    let currentElevation = this.z[x][y];
                    let currentShade = (currentElevation + 120)*(255/240);
                    k.fill(currentShade);

                    let xCoordinate = x* this.s - this.w/2;
                    let yCoordinate = y* this.s - this.h/2;
                    
                    k.vertex(xCoordinate, yCoordinate, this.z[x][y]);
                    k.vertex(xCoordinate + this.s, yCoordinate, this.z[x+1][y]);
                }
                k.endShape();
                }
            }
        }
        class ball{
            constructor(k,boxsize){
                this.boxsize =boxsize;
                this.position = k.createVector(0,0,0);
                this.velocity = k.createVector(2,5,6);
                this.radius = 10;
            }
            update(){
                this.position.add(this.velocity);
            }
            checkEdges(){
              if (this.position.x>this.boxsize/2 - this.radius || this.position.x< -this.boxsize/2 +this. radius)
                {
                    this.velocity.x*=-1;
                }  
                if(this.position.y > this.boxsize/2 - this.radius || this.position.y < -this.boxsize/2 +this.radius)
                {
                    this.velocity.y*=-1;
                }
                if(this.position.z > this.boxsize/2 - this.radius || this.position.z < -this.boxsize/2 + this.radius)
                {
                    this.velocity.z*= -1;
                }
            }
            show(){
                k.push();
                k.translate(this.position.x, this.position.y, this.position.z);
                k.normalMaterial();
                k.sphere(this.radius);
                k.pop();
            }
        }        
    };
    let fevents=[];
    let fmode={
        balloon:1,
        accwind:2,
        mass:3,
        friction:4,
        drag:5
    }
    let c=0.1;
    let Balloon;
    let Windball;
    let lightball;
    let heavyball;
    let slowball;
    let slowerball;
    let dragballs=[];
    let Liquid;
    function setfmode(index){
        fevents.fill(0);
        fevents[index]=1;
        if (index===5 && lforce) lforce.reset();
    }
    for (const [id,index] of Object.entries(fmode)){
        document.getElementById(id).addEventListener('click',() => setfmode(index));
    }
    const force = (f) => {
        f.setup = () => {
            f.createCanvas(640,250);
            Balloon = new balloon(f, f.width, f.height);
            lightball = new windball(f,200, 30, 3);
            heavyball = new windball(f,400, 30, 6);
            Windball = new windball(f,320,30,3);
            slowball = new windball(f,360,30,3);
            slowerball=new windball(f, 200, 30, 6);
            Liquid= new liquid(f ,0 , f.height/2, f.width, f.height/2, 0.1);
            
        };
        f.draw = () =>{
            if(fevents[1]===1){
                f.background(255);
                Balloon.update();
                Balloon.show();
            } 
            else if(fevents[2]===1){
                f.background(255);
                let gravity = f.createVector(0,0.1);
                Windball.applyForce(gravity);
                if(f.mouseIsPressed){
                    let wind = f.createVector(0.1,0);
                    Windball.applyForce(wind);
                }
                Windball.update();
                Windball.show();
                Windball.checkEdges();
            }
            else if(fevents[3]===1){
                f.background(255);
                let gravity = f.createVector(0, 0.1);
                lightball.applyGravity(gravity);
                heavyball.applyGravity(gravity);
                if(f.mouseIsPressed){
                    let wind = f.createVector(0.1, 0);
                    lightball.applyForce(wind);
                    heavyball.applyForce(wind);
                }
                lightball.update();
                lightball.show();
                lightball.checkEdges();

                heavyball.update();
                heavyball.show();
                heavyball.checkEdges();
            }
            else if(fevents[4]===1){
                f.background(255);
                let gravity = f.createVector(0,0.2);
                slowball.applyGravity(gravity);
                slowerball.applyGravity(gravity);
                if(f.mouseIsPressed){
                    let wind = f.createVector(0.3,0);
                    slowball.applyForce(wind);
                    slowerball.applyForce(wind);
                }
                if (slowball.contactEdge()){
                    let friction = slowball.velocity.copy();
                    friction.mult(-1);
                    friction.setMag(c);
                    slowball.applyfriction(friction);
                }
                if (slowerball.contactEdge()){
                    let friction = slowerball.velocity.copy();
                    friction.mult(-1);
                    friction.setMag(c);
                    slowerball.applyfriction(friction);
                }
                
                slowerball.update();
                slowerball.bounceEdges();
                slowerball.show();

                slowball.update();
                slowball.bounceEdges();
                slowball.show();  
            }
            else if(fevents[5]===1){
                f.background(255);
                Liquid.show();
                for (let i = 0;i<dragballs.length;i++){
                    if(Liquid.contains(dragballs[i])){
                        let dragForce = Liquid.calculateDrag(dragballs[i]);
                        dragballs[i].applyForce(dragForce);
                    }
                    let gravity = f.createVector(0, 0.1 * dragballs[i].mass);
                    dragballs[i].applyForce(gravity);
                    dragballs[i].update();
                    dragballs[i].show();
                    dragballs[i].bounceEdges();
                }
            }
            else{f.background(255);}
        };
        class balloon{
            constructor(f,width,height){
                this.position = f.createVector(width/2,height/2);
                this.velocity = f.createVector(0,0);
                this.acceleration = f.createVector(0,0);
                this.helium = f.createVector(0, -0.01);
                this.noiseX = 1000;
                this.topSpeed = 5;
                this.diameter = height/5;
                this.strokeWeight = 1;
                this.triangleSize = 5;
            }
            applyForce(force){
                this.acceleration.add(force);
            }
            shouldBounce(){
                return this.position.y-this.diameter/2-this.strokeWeight<0;
            }
            update(){
                if(this.shouldBounce()){
                    this.position.y = this.diameter/2 - this.strokeWeight+2;
                    this.velocity.y*= -0.75;
                }
                this.applyForce(this.helium);
                let windX = f.map(f.noise(this.noiseX),0,1,-0.01,0.01);
                let wind = f.createVector(windX, 0);
                
                this.applyForce(wind);
                this.velocity.add(this.acceleration);
                this.velocity.limit(this.topSpeed);
                this.position.add(this.velocity);
                this.checkSides();
                this.acceleration.mult(0);
                this.noiseX += 0.01;
            }
            checkSides(){
                if(this.position.x > f.width){
                    this.position.x = 0;
                }
                if(this.position.x < 0){
                    this.position.x = f.width;
                }
            }
            show(){
                f.stroke(0);
                f.strokeWeight(this.strokeWeight);
                f.fill("lightgreen");
                f.circle(this.position.x, this.position.y, this.diameter);

                const ballonBottom = this.position.y + this.diameter/2;
                f.triangle(
                    this.position.x,
                    ballonBottom,
                    this.position.x + this.triangleSize,
                    ballonBottom + this.triangleSize,
                    this.position.x - this.triangleSize,
                    ballonBottom + this.triangleSize 
                );
                f.line(
                    this.position.x,
                    ballonBottom + this.triangleSize,
                    this.position.x,
                    ballonBottom + this.triangleSize*20
                );
            }
        }
        class windball{
            constructor(f,x,y,m){
                this.mass = m;
                this.radius = f.floor(m^(1/2))*6;
                this.position = f.createVector(x,y);
                this.velocity = f.createVector(0,0);
                this.acceleration = f.createVector(0,0);
            }
            applyForce(force){
                let frc = force.copy();
                frc.div(this.mass);
                this.acceleration.add(frc);
            }
            applyfriction(friction){
                this.acceleration.add(friction);
            }
            applyGravity(gravity){
                this.acceleration.add(gravity);
            }
            update(){
                this.velocity.add(this.acceleration);
                this.position.add(this.velocity);
                this.acceleration.mult(0);
            }
            show(){
                f.stroke(0);
                f.strokeWeight(2);
                f.fill(127,127);
                f.circle(this.position.x, this.position.y, this.radius*2);
            }
            contactEdge(){
                return(this.position.y>f.height - this.radius -1);
            }
            bounceEdges(){
                let bounce = -0.95;
                if (this.position.x > f.width - this.radius){
                    this.position.x = f.width - this.radius;
                    this.velocity.x *= bounce;
                } else if(this.position.x < this.radius){
                    this.position.x = this.radius;
                    this.velocity.x *= bounce;
                }
                if (this.position.y > f.height - this.radius){
                    this.position.y = f.height - this.radius;
                    this.velocity.y *= bounce; 
                }
            }
            checkEdges(){
                if(this.position.x>f.width-this.radius){
                    this.position.x = f.width - this.radius;
                    this.velocity.x*=-1;
                } else if (this.position.x<this.radius){
                    this.velocity.x*=-1;
                    this.position.x = this.radius;
                }
                if (this.position.y>f.height-this.radius){
                    this.velocity.y*=-1;
                    this.position.y = f.height - this.radius;
                }
            }
        }
        class liquid{
            constructor(f, x, y, w, h, c){
                this.x = x;
                this.y = y;
                this.w = w;
                this.h = h;
                this.c = c;
            }
        contains(dragballs){
            let pos = dragballs.position;
            return(
                pos.x > this.x &&
                pos.x < this.x + this.w &&
                pos.y > this.y &&
                pos.y < this.y + this.h
            );
        }
        calculateDrag(dragballs){
            let speed = dragballs.velocity.mag();
            let dragMagnitude = this.c*speed*speed;
            let dragForce = dragballs.velocity.copy();
            dragForce.mult(-1);
            dragForce.setMag(dragMagnitude);
            return dragForce;
        }
        show(){
            f.noStroke();
            f.fill(220);
            f.rect(this.x, this.y, this.w, this.h);
        }
        }
        f.reset = () => {
            for (let i=0; i<9 ; i++){
                dragballs[i]= new windball(f , 40 + i*70, 0, f.random(1, 5));
            }
        };
    };
const lforce = new p5(force,'force');
const l3D = new p5(zaxis,'z');
const lrandom = new p5(random,'random');
const lvector = new p5(vector, 'vector');