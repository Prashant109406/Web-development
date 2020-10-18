let canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext('2d');


//x i y values of mouse
let mouse = {
    x: undefined,
    y: undefined
}

let maxRadius = 10;

let minRadius = 3;

//tworzymy array kolorow
let colorArray = [
    '#F6E6E7',
    '#E8C7C8',
    '#F1D9DA',
    '#C8DBDC'
    // '#84513E'
]

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
})

window.addEventListener('resize', function()
    {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

})

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius
    this.minRadius = minRadius
    this.color = colorArray[Math.floor(Math.random() * colorArray.length + 1)]
    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI *2, false);
        c.fillStyle = this.color;
        c.fill();
    }
    
    this.update = function() {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        } 
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0){
            this.dy = -this.dy;
        }
        
        this.x += this.dx;
        this.y += this.dy

        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if(this.radius < maxRadius){
                this.radius += 1;
                }
        } else if(this.radius > this.minRadius){
            this.radius -=1;
    
        }
        
        this.draw();
    }
}



let circleArray = [];
function init() {
    

    for (let i = 0; i <600; i++){ 

    var radius = Math.random() * 3 + 1; 
    
    let x = Math.random() * (innerWidth - radius * 2) + radius; 
    let y =Math.random() * (innerHeight - radius * 2) + radius;
    
    let dx = (Math.random() - 0.5) *2 ;
    let dy = (Math.random() - 0.5) *0.2 ;
    circleArray.push( new Circle(x, y, dx, dy, radius));
}
}


function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight );

    for (let i = 0; i < circleArray.length; i++){
        circleArray[i].update();
    } false
    
    
}

init();
animate();

